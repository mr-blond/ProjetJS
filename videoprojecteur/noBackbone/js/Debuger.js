function Debuger() {
}
Debuger.init = function()
{
    this.canvas = document.getElementById("canvasDebug");
    this.canvas.width = jeu.width;
    this.canvas.height = jeu.height;
    this.draw = new jeu.b2DebugDraw();
    this.draw.SetSprite(document.getElementById("canvasDebug").getContext("2d"));
    this.draw.SetFillAlpha(0.5);
    this.draw.SetDrawScale(5.0);
    this.draw.SetLineThickness(1.0);
    this.draw.SetFlags(jeu.b2DebugDraw.e_shapeBit | jeu.b2DebugDraw.e_jointBit);
    jeu.world.SetDebugDraw(this.draw);
}
Debuger.update = function()
{
    jeu.world.Step(1 / 60, 10, 10);
    jeu.world.DrawDebugData();
    jeu.world.ClearForces();
};