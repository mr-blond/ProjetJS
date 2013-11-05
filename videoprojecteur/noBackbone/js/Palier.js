function Palier() {
    this.x = 0;
    this.y = 0;
    this.height = 0;
    this.width = 0;
    this.angle = 0;
}
Palier.elements = Array();
Palier.init = function()
{
    Palier.canvas = document.getElementById('canvasPalier');
    Palier.canvas.height = jeu.height;
    Palier.canvas.width = jeu.width;
    Palier.context = Palier.canvas.getContext('2d');
};
Palier.prototype = {
    constructor: Gouttelette,
    init: function (properties) {
        Object.extend(this, properties);

        //Objet box2d
        jeu.bodyDef.type = jeu.b2Body.b2_staticBody;
        jeu.fixDef.shape = new jeu.b2PolygonShape();
        jeu.fixDef.shape.SetAsBox(this.width / 2, this.height / 2);
        jeu.bodyDef.position.x = this.x;
        jeu.bodyDef.position.y = this.y;
        jeu.bodyDef.angle = this.angle;
        this.box2d = jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);

        Palier.elements.push(this);
    },
    update: function ()
    {
        this.x = this.box2d.GetBody().GetPosition().x;
        this.y = this.box2d.GetBody().GetPosition().y;
    },
    draw: function ()
    {
        this.box2d.GetBody().SetAngle(this.angle);
        Palier.context.save();
        Palier.context.translate(this.x, this.y);
        Palier.context.rotate(this.angle);
        Palier.context.beginPath();
        Palier.context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        Palier.context.fillStyle = 'yellow';
        Palier.context.fill();
        Palier.context.lineWidth = 1;
        Palier.context.strokeStyle = 'black';
        Palier.context.stroke();
        Palier.context.restore();
    }
};
Palier.render = function() {

    Palier.elements.forEach = function(entry) {
        console.log('1');
        entry.draw();
    }

    for (var i = 0, l = Palier.elements.length; i < l; i++) {
        var particle = Palier.elements[i];
        particle.draw();
    }
};