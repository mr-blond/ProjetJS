function Level(){
}
Level.currentAngle = 0;
Level.largeurCadre = 100;
Level.init = function()
{
    Level.json = {
        "palier": [
            { x: -50, y: Const.height / 2, width: Level.largeurCadre, height: Const.height + Level.largeurCadre * 2 },
            { x: Const.width, y: Const.height / 2, width: Level.largeurCadre, height: Const.height / 2 },
            { x: Const.width / 2, y: -50, width: Const.width + Level.largeurCadre * 2, height: Level.largeurCadre },
            { x: Const.width / 2, y: Const.height + 50, width: Const.width + Level.largeurCadre * 2, height: Level.largeurCadre },

            { x: 50, y: 200, width: 100, height: 10, angle: 0.1 },
            { x: 100, y: 100, width: 100, height: 10, angle: 0.1 },
            { x: 200, y: 150, width: 100, height: 10, angle: 0.1 }
        ]
    }
    Level.json.palier.forEach(function(entry)
    {
        var palier = new Palier();
        palier.init(entry);
    });
    var generateur = new GenerateurGouttelette;
    generateur.init({cooldown: 15});
};
Level.rotate = function(angle)
{
    var dif = this.currentAngle - angle;
    Palier.rotate(dif);
    GenerateurGouttelette.rotate(dif);
    //Modifier la position des élemnts pose des problèmes a Box2D
    //Tant que la rotation reste progressive, inutile de les déplacer
    //Fluid.rotate(dif);
}