Const = new Object();
Const.width = 800;
Const.height = 600;
Const.scale = 0.005;
Const.hauteur_delestage = 2000;

var bricksScheduledForRemoval;

function init() {

	var rendering = false;

    Box2DWrapper.init();
    SocketIoWrapper.init();
    Fluid.init();
    Gouttelette.init();
    GenerateurGouttelette.init();
    Palier.init();
    Level.init();
    Debuger.init();

    function run() {
        requestAnimFrame(run);

        /*
        Palier.move(4, merde, 500, merde / 100);
        Level.rotate(0.01);
		*/

        Box2DWrapper.update();
        SocketIoWrapper.update();
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
    }
    run();


	//"Best practice" recommandé pour supprimer un éléments box2d
	//Dégoutant, et ne semble pas fonctionner
	//Etant donnée que DestroyBody ne renvoie aucune erreur ou confirmation quelque soit le cas de figure, difficile d'en juger
	window.setInterval(removeObjScheduledForRemoval, 1000/90);
	bricksScheduledForRemoval = Array();
	function removeObjScheduledForRemoval()
	{
		var index = bricksScheduledForRemoval.length;
		for(var i = 0; i < index; i++){
			Box2DWrapper.world.DestroyBody(bricksScheduledForRemoval[i]);
			bricksScheduledForRemoval[i] = null;
		}
		bricksScheduledForRemoval = Array();
	}

};