function GenerateurGouttelette() {
    this.cooldown = 0;
    this.current_cooldown = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.canvas = null;
}

GenerateurGouttelette.init = GenerateurGouttelette.clear = function()
{
    GenerateurGouttelette.elements = [];
};
GenerateurGouttelette.create = function(properties)
{
	var genGouttelette = new GenerateurGouttelette();
	genGouttelette.init(properties);
	GenerateurGouttelette.elements.push(genGouttelette);
}
GenerateurGouttelette.rotate = function(angle)
{
    for (var i = 0, l = GenerateurGouttelette.elements.length; i < l; i++)
    {
        var generateur = GenerateurGouttelette.elements[i];

        generateur.x -= Const.width / 2;
        generateur.y -= Const.height / 2;
        var newX = (generateur.x) * Math.cos(-angle) - (generateur.y) * Math.sin(-angle);
        generateur.y   = (generateur.x) * Math.sin(-angle) + (generateur.y) * Math.cos(-angle);
        generateur.x = newX;
        generateur.x += Const.width / 2;
        generateur.y += Const.height / 2;
    }
};
GenerateurGouttelette.update = function()
{
    for (var i = 0, l = GenerateurGouttelette.elements.length; i < l; i++)
    {
        GenerateurGouttelette.elements[i].update();
    }
};
GenerateurGouttelette.prototype =
{
    constructor: GenerateurGouttelette,
    init: function (properties) {
        Object.extend(this, properties);
    },
    update: function ()
    {
        this.current_cooldown++;
        if(this.current_cooldown > this.cooldown)
        {
            this.current_cooldown = 0;
            Gouttelette.create({
                type: 1,
                x: this.x,
                y: this.y
            });
        }
    }
};