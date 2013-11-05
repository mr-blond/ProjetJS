function Palier() {
    this.x = 0;
    this.y = 0;
    this.px = 0;
    this.py = 0;
    this.height = 0;
    this.width = 0;
    this.canvas = null;
    this.angle = 0;
}
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

        this.px = this.x;
        this.py = this.y;

        //create some objects
        jeu.bodyDef.type = jeu.b2Body.b2_staticBody;
        jeu.fixDef.shape = new jeu.b2PolygonShape();
        jeu.fixDef.shape.SetAsBox(80, 10);
        jeu.bodyDef.position.x = this.x;
        jeu.bodyDef.position.y = this.y;
        jeu.bodyDef.angle = this.angle;
        this.box2d = jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);
    },
    update: function ()
    {
        this.x = this.box2d.GetBody().GetPosition().x;
        this.y = this.box2d.GetBody().GetPosition().y;
    },
    draw: function ()
    {

        this.angle += 0.01;

        this.box2d.GetBody().SetAngle(this.angle);
        //Palier.context.save();
        Palier.context.translate(jeu.width / 2, jeu.height / 2);
        Palier.context.rotate(this.angle);
        Palier.context.beginPath();
        Palier.context.rect(this.x - jeu.width / 2, this.y - jeu.height / 2, this.height, this.width);
        Palier.context.fillStyle = 'yellow';
        Palier.context.fill();
        Palier.context.lineWidth = 1;
        Palier.context.strokeStyle = 'black';
        Palier.context.stroke();
        //Palier.context.restore();
    }
};