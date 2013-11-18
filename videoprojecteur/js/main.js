Const = new Object();
Const.width = 1280;
Const.height = 720;
Const.scale = 0.005;

function init() {

    Box2DWrapper.init();
    Fluid.init();
    Gouttelette.init();
    GenerateurGouttelette.init();
    Palier.init();
    Level.init();
    Debuger.init();

    function run() {
        requestAnimFrame(run);

        Fluid.update();
        Debuger.update();
        Palier.update();
        GenerateurGouttelette.update();
    }
    run();

};