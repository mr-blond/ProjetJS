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
    //Angle du bas
            { x: Const.width * 1/4, y: Const.height + 15, width: Const.width / 2 + 20, height: 100, angle: -.15, color: "#333" },
            { x: Const.width * 1/4 - 50, y: Const.height - 115, width: Const.width / 2 + 83, height: 10, angle: 0.15, color: "#333" },
            { x: Const.width * 3/4, y: Const.height + 15, width: Const.width / 2 + 20, height: 100, angle: .15, color: "#333" },
			//Palier déplacable
            { x: 400, y: 100, width: 100, height: 10, angle: -0.1, color: "#000" },
            { x: 300, y: 170, width: 100, height: 10, angle: 0.1, color: "#000" },
            { x: 450, y: 400, width: 100, height: 10, angle: 0.1, color: "#000" }
        ]
    }
    Level.json.palier.forEach(function(entry)
    {
        var palier = new Palier();
        palier.init(entry);
    });
    GenerateurGouttelette.create({cooldown: 8, x: Const.width / 2});
};
Level.rotate = function(angle)
{
    angle *= (Math.PI/180);
    var dif = this.currentAngle - angle;
    this.currentAngle = angle;
    Palier.rotate(dif);
    GenerateurGouttelette.rotate(dif);
    //Modifier la position des élemnts pose des problèmes a Box2D
    //Tant que la rotation reste progressive, inutile de les déplacer
    //Fluid.rotate(dif);
}