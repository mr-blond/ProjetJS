function Gouttelette() {
    this.type = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.id = 0;
    this.canvas = null;
}
Gouttelette.elements = Array();
Gouttelette.ratio_affichage = 10;
Gouttelette.radius = 3;
Gouttelette.init = function()
{
    //Mise en cache du dégradé de la goutte
    //Pour améliorer les performances
    Gouttelette.degrade = document.createElement('canvas');
    var ncontext = Gouttelette.degrade.getContext('2d');
    Gouttelette.degrade.height = Gouttelette.degrade.width = Gouttelette.radius * 2 * Gouttelette.ratio_affichage;
    var grad = ncontext.createRadialGradient(
        Gouttelette.radius * Gouttelette.ratio_affichage,
        Gouttelette.radius * Gouttelette.ratio_affichage,
        1,
        Gouttelette.radius * Gouttelette.ratio_affichage,
        Gouttelette.radius * Gouttelette.ratio_affichage,
        Gouttelette.radius * Gouttelette.ratio_affichage);
    grad.addColorStop(0, 'rgba(230,50,50,1)');
    grad.addColorStop(1, 'rgba(230,50,50,0)');
    ncontext.fillStyle = grad;
    ncontext.beginPath();
    ncontext.arc(
        Gouttelette.radius * Gouttelette.ratio_affichage,
        Gouttelette.radius * Gouttelette.ratio_affichage,
        Gouttelette.radius * Gouttelette.ratio_affichage,
        0, Math.PI * 2, true);
    ncontext.closePath();
    ncontext.fill();

    Gouttelette.canvas = document.createElement('canvas');
    Gouttelette.canvas.height = Const.height;
    Gouttelette.canvas.width = Const.width;
    Gouttelette.canvas_context = Gouttelette.canvas.getContext('2d');
}
Gouttelette.create = function(properties)
{
    var gouttelette = new Gouttelette();
    gouttelette.init(properties);
    Gouttelette.elements.push(gouttelette);
}
Gouttelette.update = function()
{

    for (var i = 0, l = Gouttelette.elements.length; i < l; i++)
    {
		if(Gouttelette.elements[i])
		{
			Gouttelette.elements[i].draw();
			if(Gouttelette.elements[i].y > Const.hauteur_delestage)
				Gouttelette.delete(i);
		}
    }
}
Gouttelette.delete = function(id)
{
    console.log('Gouttelette ' + id + ' supprimé');
	bricksScheduledForRemoval.push(this.elements[id].box2d);
    Gouttelette.elements.splice(id, 1);
}
Gouttelette.prototype =
{
    constructor: Gouttelette,
    init: function (properties)
    {
        Object.extend(this, properties);
        this.id = Gouttelette.elements.length;

        //create some objects
        Box2DWrapper.bodyDef.type = Box2DWrapper.b2Body.b2_dynamicBody;
        Box2DWrapper.fixDef.shape = new Box2DWrapper.b2CircleShape(
            Gouttelette.radius * Const.scale
        );
        Box2DWrapper.bodyDef.position.x = this.x * Const.scale;
        Box2DWrapper.bodyDef.position.y = this.y * Const.scale;
        this.box2d = Box2DWrapper.world
            .CreateBody(Box2DWrapper.bodyDef)
            .CreateFixture(Box2DWrapper.fixDef);
        this.box2d.GetBody().GetLinearVelocity().x = this.vx;
        this.box2d.GetBody().GetLinearVelocity().y = this.vy;
    },
    rotate: function (angle)
    {
        this.x -= Const.width / 2;
        this.y -= Const.height / 2;
        var newX = (this.x) * Math.cos(-angle) - (this.y) * Math.sin(-angle);
        this.y   = (this.x) * Math.sin(-angle) + (this.y) * Math.cos(-angle);
        this.x = newX;
        this.x += Const.width / 2;
        this.y += Const.height / 2;

        this.box2d.GetBody().SetPosition(new Box2DWrapper.b2Vec2(this.x * Const.scale, this.y * Const.scale));
    },
    draw: function ()
    {
        this.x = this.box2d.GetBody().GetPosition().x / Const.scale;
        this.y = this.box2d.GetBody().GetPosition().y / Const.scale;

        Gouttelette.canvas_context.drawImage(
            Gouttelette.degrade,
            this.x - Gouttelette.radius * Gouttelette.ratio_affichage,
            this.y - Gouttelette.radius * Gouttelette.ratio_affichage,
            Gouttelette.radius * 2 * Gouttelette.ratio_affichage,
            Gouttelette.radius * 2 * Gouttelette.ratio_affichage);
    }
};