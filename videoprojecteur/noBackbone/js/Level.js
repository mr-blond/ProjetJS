function Level()
{
}
Level.init = function()
{
    Level.json = {
        "palier": [
            { x: -50, y: jeu.height / 2, width: 100, height: jeu.height },
            { x: jeu.width / 2, y: -50, width: jeu.width, height: 100 },
            { x: jeu.width / 2, y: jeu.height + 50, width: jeu.width, height: 100 },
            { x: 10, y: 10, width: 100, height: 10 },
            { x: 100, y: 100, width: 100, height: 10 },
            { x: 200, y: 150, width: 100, height: 10 }
        ]
    }
    Level.json.palier.forEach(function(entry)
    {
        var palier = new Palier();
        palier.init(entry);
    });
};