Const = new Object();
Const.width = 1280;
Const.height = 720;
Const.scale = 0.005;
Const.hauteur_delestage = 1000;

function init() {

    Box2DWrapper.init();
    Fluid.init();
    Gouttelette.init();
    GenerateurGouttelette.init();
    Palier.init();
    Level.init();
    Debuger.init();

    var merde = 600;
    //Palier.move(0, 600, 200, 3);

    function run() {
        requestAnimFrame(run);


        merde +=0.7;
        Palier.move(4, merde, 500, merde / 100);
        Level.rotate(0.01);

        Box2DWrapper.update();
        Fluid.update();
        Debuger.update();
        Palier.update();
        GenerateurGouttelette.update();
    }
    run();

};