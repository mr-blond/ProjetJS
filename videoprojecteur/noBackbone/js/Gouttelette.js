function Gouttelette() {
    this.type = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.px = 0;
    this.py = 0;
    this.radius = 0;
    this.canvas = null;
}
Gouttelette.prototype = {
    constructor: Gouttelette,
    init: function (properties) {
        Object.extend(this, properties);
        var ncanvas = document.createElement('canvas'),
            ncontext = ncanvas.getContext('2d');
        ncanvas.height = ncanvas.width = this.radius * 2;
        var grad = ncontext.createRadialGradient(this.radius, this.radius, 1, this.radius, this.radius, this.radius);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        //grad.addColorStop(1, 'rgba(255, 0, 0 ,1)');
        ncontext.fillStyle = grad;
        ncontext.beginPath();
        ncontext.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, true);
        ncontext.closePath();
        ncontext.fill();
        this.px = this.x;
        this.py = this.y;
        this.canvas = ncanvas;

        //create some objects
        jeu.bodyDef.type = jeu.b2Body.b2_dynamicBody;
        jeu.fixDef.shape = new jeu.b2CircleShape(
            Math.random() + 5 //radius
        );
        jeu.bodyDef.position.x = this.x;
        jeu.bodyDef.position.y = this.y;
        this.box2d = jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);
    },
    update: function () {
        var g = jeu.grid[Math.round(this.y / jeu.spacing) * jeu.num_x + Math.round(this.x / jeu.spacing)];
        if (g) g.close[g.length++] = this;

        //Vitesse de déplacement
        /*
        this.vx = this.x - this.px;
        this.vy = this.y - this.py;

        this.vx += jeu.gravity_x;
        this.vy += jeu.gravity_y;
        this.px = this.x;
        this.py = this.y;

        this.x += this.vx;
        this.y += this.vy;
        */
        this.x = this.box2d.GetBody().GetPosition().x;
        this.y = this.box2d.GetBody().GetPosition().y;
    },
    attract: function () {
        var force = 0,
            force_b = 0,
            cell_x = Math.round(this.x / jeu.spacing),
            cell_y = Math.round(this.y / jeu.spacing),
            close = [];
        for (var x_off = -1; x_off < 2; x_off++) {
            for (var y_off = -1; y_off < 2; y_off++) {
                var index = (cell_y + y_off) * jeu.num_x + (cell_x + x_off);
                var cell = jeu.grid[index];
                if (!cell || !cell.length) {
                    continue;
                }
                for (var a = 0, l = cell.length; a < l; a++) {
                    var particle = cell.close[a];
                    if (particle !== this) {
                        var dfx = particle.x - this.x,
                            dfy = particle.y - this.y,
                            distance = Math.sqrt(dfx * dfx + dfy * dfy);
                        if (distance < jeu.spacing) {
                            var m = 1 - (distance / jeu.spacing);
                            force += m * m;
                            force_b += (m * m * m) / 2;
                            particle.m = m;
                            particle.dfx = (dfx / distance) * m;
                            particle.dfy = (dfy / distance) * m;
                            close.push(particle);
                        }
                    }
                }
            }
        }

        force = (force - 3) * 0.5; // test this

        for (var i = 0, l = close.length; i < l; i++) {
            var neighbor = close[i],
                press = force + force_b * neighbor.m;

            if (this.type != neighbor.type) {
                press *= 0.65;
            }

            var dx = neighbor.dfx * press * 0.5,
                dy = neighbor.dfy * press * 0.5;
            neighbor.x += dx;
            neighbor.y += dy;
            this.x -= dx;
            this.y -= dy;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > jeu.width) this.x = jeu.width;
        if (this.y < 0) this.y = 0;
        if (this.y > jeu.height) this.y = jeu.height;

    },
    draw: function () {

        this.x = this.box2d.GetBody().GetPosition().x;
        this.y = this.box2d.GetBody().GetPosition().y;

        jeu.meta_context.drawImage(this.canvas, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
};