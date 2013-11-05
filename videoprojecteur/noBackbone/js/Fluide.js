function Fluid() {
    this.particles = [];
    for (var i = 0; i < jeu.num_x * jeu.num_y; i++) {
        jeu.grid.push({
            length: 0,
            close: []
        });
    }
    for (var i = 0, l = 1; i < l; i++) {
        var particle = new Gouttelette();
        particle.init({
            type: i,
            x: Math.random() * jeu.width,
            y: Math.random() * jeu.height,
            radius: 30
        })
        this.particles.push(particle);
    }
}
Fluid.prototype = {
    constructor: Fluid,
    update: function () {

        for (var i = 0, l = this.particles.length; i < l; i++) {
            var particle = this.particles[i];

            particle.update();
            //particle.attract();
            particle.draw();

        }
    },
    render: function () {
        var image = jeu.meta_context.getImageData(0, 0, jeu.width, jeu.height),
            data = image.data;

        for (var i = 0, l = data.length; i < l; i += 4) {
            if (data[i + 3] < jeu.threshold) {
                data[i + 0] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
            else if(data[i + 3] == jeu.threshold)
            {

            }
            else
            {

               data[i+0] = 0;
               data[i+1] = 0;
               data[i+2] = 0;
            }
        }
        jeu.context.putImageData(image, 0, 0);
    }
};