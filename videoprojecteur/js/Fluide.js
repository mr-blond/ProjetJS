function Fluid() { }
Fluid.init = function()
{
    Fluid.threshold = 210;

    Fluid.canvas = document.getElementById('canvasGoutte');
    Fluid.canvas.height = Const.height;
    Fluid.canvas.width = Const.width;
    Fluid.context = Fluid.canvas.getContext('2d');
};
Fluid.update = function ()
{
    Gouttelette.update();
    Fluid.render();
},
Fluid.render = function ()
{
    var image = Gouttelette.canvas_context.getImageData(0, 0, Const.width, Const.height),
        data = image.data;

    for (var i = 0, l = data.length; i < l; i += 4) {
        if (data[i + 3] < Fluid.threshold) {
            data[i + 0] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }
        else if(data[i + 3] == Fluid.threshold)
        {
            data[i+0] = 230;
            data[i+1] = 50;
            data[i+2] = 50;
        }
        else
        {
            data[i+0] = 230;
            data[i+1] = 50;
            data[i+2] = 50;
        }
    }
    Fluid.context.putImageData(image, 0, 0);
    Gouttelette.canvas_context.clearRect(0, 0, Const.width, Const.height);
}