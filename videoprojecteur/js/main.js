Const = new Object();
Const.width = 800;
Const.height = 600;
Const.scale = 0.005;
Const.hauteur_delestage = 2000;

var bricksScheduledForRemoval

function init() {

	var rendering = false;

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
		GenerateurGouttelette.update();

		//Empeche le chevauchement de plusieurs rendus
		if(!rendering)
		{
			rendering = true;
			Fluid.update();
			Debuger.update();
			Palier.update();
			rendering = false;
		}

		//"Best practice" recommandé par Box2DWeb pour supprimer un éléments
		//Moche, mais fonctionnel
		window.setInterval(removeObjScheduledForRemoval, 1000/90);
		bricksScheduledForRemoval = Array();
		var index = -1;
		function removeObjScheduledForRemoval()
		{
			for(var i = 0; i <= index; i++){
				world.DestroyBody(bricksScheduledForRemoval[i]);
				bricksScheduledForRemoval[i] = null;
			}
			bricksScheduledForRemoval = Array();
			index = -1;
		}
    }
    run();

};