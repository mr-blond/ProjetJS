function Debuger() {
}
Debuger.init = function()
{
    this.canvas = document.getElementById("canvasDebug");
	this.canvas_context = this.canvas.getContext('2d');
    this.canvas.width = Const.width;
    this.canvas.height = Const.height;
    this.draw = new Box2DWrapper.b2DebugDraw();
    this.draw.SetSprite(document.getElementById("canvasDebug").getContext("2d"));
    this.draw.SetFillAlpha(0.5);
	this.draw.SetDrawScale(1 / Const.scale / 1.5);
    this.draw.SetLineThickness(1.0);
    this.draw.SetFlags(Box2DWrapper.b2DebugDraw.e_shapeBit | Box2DWrapper.b2DebugDraw.e_jointBit);
    Box2DWrapper.world.SetDebugDraw(this.draw);
}
Debuger.update = function()
{
    Box2DWrapper.world.DrawDebugData();
};