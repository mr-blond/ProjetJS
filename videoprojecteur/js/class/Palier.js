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
    Palier.canvas.height = Const.height;
    Palier.canvas.width = Const.width;
    Palier.context = Palier.canvas.getContext('2d');
};
Palier.update = function()
{
    Palier.context.clearRect(0, 0, Const.width, Const.height);
    for (var i = 0, l = Palier.elements.length; i < l; i++)
    {
        Palier.elements[i].draw();
    }
};
Palier.rotate = function(angle)
{
    for (var i = 0, l = Palier.elements.length; i < l; i++)
    {
        var palier = Palier.elements[i];

        palier.x -= Const.width / 2;
        palier.y -= Const.height / 2;
        var newX = (palier.x) * Math.cos(-angle) - (palier.y) * Math.sin(-angle);
        palier.y   = (palier.x) * Math.sin(-angle) + (palier.y) * Math.cos(-angle);
        palier.x = newX;
        palier.x += Const.width / 2;
        palier.y += Const.height / 2;

        palier.angle -= angle;

        palier.box2d.GetBody().SetPosition(new Box2DWrapper.b2Vec2(palier.x * Const.scale, palier.y * Const.scale));
    }
};
Palier.move = function(id, x, y, angle){
    Palier.elements[id].moveTo(x, y, angle);
}
Palier.prototype = {
    constructor: Gouttelette,
    init: function (properties) {
        Object.extend(this, properties);

        //Objet box2d
        Box2DWrapper.bodyDef.type = Box2DWrapper.b2Body.b2_staticBody;
        Box2DWrapper.fixDef.shape = new Box2DWrapper.b2PolygonShape();
        Box2DWrapper.fixDef.shape.SetAsBox(this.width / 2 * Const.scale, this.height / 2 * Const.scale);
        Box2DWrapper.bodyDef.position.x = this.x * Const.scale;
        Box2DWrapper.bodyDef.position.y = this.y * Const.scale;
        Box2DWrapper.bodyDef.angle = this.angle;
        this.box2d = Box2DWrapper.world.CreateBody(Box2DWrapper.bodyDef).CreateFixture(Box2DWrapper.fixDef);

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
        Palier.context.fillStyle = '#333333';
        Palier.context.fill();
		/*
        Palier.context.lineWidth = 1;
        Palier.context.strokeStyle = 'black';
        Palier.context.stroke();
        */
        Palier.context.restore();
    },
    moveTo: function (x, y, angle)
    {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.box2d.GetBody().SetPosition(new Box2DWrapper.b2Vec2(this.x * Const.scale, this.y * Const.scale));
    }
};