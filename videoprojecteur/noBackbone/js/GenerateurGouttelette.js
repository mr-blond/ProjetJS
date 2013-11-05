function GenerateurGouttelette()
{
    this.element = Array();

    this.clear = function()
    {
        this.element = Array();
    }

    this.add = function(option)
    {
        option.cooldown = 0;
        this.element.splice(-1, 0, option);
    }

    this.affiche = function()
    {
        for (i = 0; i < this.element.length; i++)
        {
            this.element[i].cooldown++;
            if( 10 < this.element[i].cooldown)
            {
                this.element[i].cooldown = 0;
                var particle = new Gouttelette();
                particle.init({
                    type: 1,
                    x: 50,
                    y: 20,
                    radius: 30
                })
                jeu.fluid.particles.push(particle);
            }
        }
    }
}