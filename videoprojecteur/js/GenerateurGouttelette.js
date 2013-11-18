function GenerateurGouttelette() {
    this.cooldown = 0;
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

        GenerateurGouttelette.elements.push(this);
    },
    update: function ()
    {
        this.cooldown++;
        if( 1 < this.cooldown)
        {
            this.cooldown = 0;
            var gouttelette = new Gouttelette();
            gouttelette.init({
                type: 1,
                x: 50,
                y: 200,
                vx: 0
            });
            Fluid.particles.push(gouttelette);
        }
    }
};