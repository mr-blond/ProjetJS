function Box2DWrapper() {
}
Box2DWrapper.init = function()
{
    this.b2Vec2 = Box2D.Common.Math.b2Vec2;
    this.b2AABB = Box2D.Collision.b2AABB;
    this.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    this.b2Body = Box2D.Dynamics.b2Body;
    this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    this.b2Fixture = Box2D.Dynamics.b2Fixture;
    this.b2World = Box2D.Dynamics.b2World;
    this.b2MassData = Box2D.Collision.Shapes.b2MassData;
    this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    this.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    this.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    this.world = new this.b2World(new this.b2Vec2(0, 9.8), true);

    //Pour changer la gravité en cours de jeu
    //this.world.SetGravity(new this.b2Vec2( 0, -9.8));

    this.fixDef = new this.b2FixtureDef;
    this.fixDef.density = 100000.0;
    this.fixDef.friction = 0.3;
    this.fixDef.restitution = 0.2;
    this.bodyDef = new this.b2BodyDef;
}
Box2DWrapper.update = function()
{
    Box2DWrapper.world.Step(1 / 60, 10, 10);
    Box2DWrapper.world.ClearForces();
};