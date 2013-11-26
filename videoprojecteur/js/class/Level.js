function Level(){
}
Level.currentAngle = 0;
Level.largeurCadre = 100;
Level.init = function()
{
    Level.json = {
        "palier": [
			//Cadre de l'écran
			/*
            { x: -50, y: Const.height / 2, width: Level.largeurCadre, height: Const.height + Level.largeurCadre * 2 },
            { x: Const.width + Level.largeurCadre / 2, y: Const.height / 2, width: Level.largeurCadre, height: Const.height },
            { x: Const.width / 2, y: -50, width: Const.width + Level.largeurCadre * 2, height: Level.largeurCadre },
            { x: Const.width / 2, y: Const.height + Level.largeurCadre / 2, width: Const.width + Level.largeurCadre * 2, height: Level.largeurCadre },
			*/

            //Palier déplacable
            { x: 400, y: 100, width: 260, height: 60, fixed: false, angle: -0.1 },
            { x: 300, y: 170, width: 260, height: 60, fixed: false, angle: 0.1 },
            { x: 450, y: 400, width: 260, height: 60, fixed: false, angle: 0.1 },

            //Angle du bas
            { x: Const.width * 0.915, y: Const.height - 7, width: 215, height: 100, angle: .15, fixed: true },
            { x: Const.width * 0.42, y: Const.height + 15, width: Const.width  * 0.85, height: 100, angle: -.07, fixed: true }
        ]
    }
    Level.json.palier.forEach(function(entry)
    {
        var palier = new Palier();
        palier.init(entry);
    });
    GenerateurGouttelette.create({cooldown: 8, x: 50, y: 50});
};
Level.rotate = function(angle)
{
    angle *= (Math.PI/180) / 3;
    var dif = this.currentAngle - angle;
    this.currentAngle = angle;
    Palier.rotate(dif);
    //GenerateurGouttelette.rotate(dif);

    //Modifier la position des élemnts pose des problèmes a Box2D
    //Tant que la rotation reste progressive, il est contre-productif de vouloir les déplacer
    //Fluid.rotate(dif);
}