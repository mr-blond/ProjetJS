jeu = new Object();

function init() {

    jeu.b2Vec2 = Box2D.Common.Math.b2Vec2;
    jeu.b2AABB = Box2D.Collision.b2AABB;
    jeu.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    jeu.b2Body = Box2D.Dynamics.b2Body;
    jeu.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    jeu.b2Fixture = Box2D.Dynamics.b2Fixture;
    jeu.b2World = Box2D.Dynamics.b2World;
    jeu.b2MassData = Box2D.Collision.Shapes.b2MassData;
    jeu.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    jeu.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    jeu.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    jeu.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    jeu.world = new jeu.b2World(
        new jeu.b2Vec2(0, 100)    //gravity
        ,  true                 //allow sleep
    );

    jeu.fixDef = new jeu.b2FixtureDef;
    jeu.fixDef.density = 1.0;
    jeu.fixDef.friction = 0.5;
    jeu.fixDef.restitution = 0.2;

    jeu.bodyDef = new jeu.b2BodyDef;

    //create ground
    jeu.bodyDef.type = jeu.b2Body.b2_staticBody;
    jeu.fixDef.shape = new jeu.b2PolygonShape;
    jeu.fixDef.shape.SetAsBox(600, 2);
    jeu.bodyDef.position.Set(10, 400 + 1.8);
    jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);
    jeu.bodyDef.position.Set(10, -1.8);
    jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);
    jeu.fixDef.shape.SetAsBox(2, 200);
    jeu.bodyDef.position.Set(-1.8, 200);
    jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);
    jeu.bodyDef.position.Set(600.8, 200);
    jeu.world.CreateBody(jeu.bodyDef).CreateFixture(jeu.fixDef);

    //setup debug draw
    var debugDraw = new jeu.b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvasDebug").getContext("2d"));
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(jeu.b2DebugDraw.e_shapeBit | jeu.b2DebugDraw.e_jointBit);
    jeu.world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / 60);

    //mouse
    var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
    var canvasPosition = getElementPosition(document.getElementById("canvasDebug"));

    function getBodyAtMouse() {
        mousePVec = new jeu.b2Vec2(mouseX, mouseY);
        var aabb = new jeu.b2AABB();
        aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
        aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

        // Query the world for overlapping shapes.

        selectedBody = null;
        jeu.world.QueryAABB(getBodyCB, aabb);
        return selectedBody;
    }

    function getBodyCB(fixture) {
        if(fixture.GetBody().GetType() != jeu.b2Body.b2_staticBody) {
            if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                selectedBody = fixture.GetBody();
                return false;
            }
        }
        return true;
    }

    //update

    function update() {

        if(isMouseDown && (!mouseJoint)) {
            var body = getBodyAtMouse();
            if(body) {
                var md = new jeu.b2MouseJointDef();
                md.bodyA = jeu.world.GetGroundBody();
                md.bodyB = body;
                md.target.Set(mouseX, mouseY);
                md.collideConnected = true;
                md.maxForce = 300.0 * body.GetMass();
                mouseJoint = jeu.world.CreateJoint(md);
                body.SetAwake(true);
            }
        }

        if(mouseJoint) {
            if(isMouseDown) {
                mouseJoint.SetTarget(new jeu.b2Vec2(mouseX, mouseY));
            } else {
                jeu.world.DestroyJoint(mouseJoint);
                mouseJoint = null;
            }
        }

        jeu.world.Step(1 / 60, 10, 10);
        jeu.world.DrawDebugData();
        jeu.world.ClearForces();
    };

    jeu.height = 400;
    jeu.width = 600;

    jeu.canvas = document.getElementById('canvasGoutte');
    jeu.canvas.height = jeu.height;
    jeu.canvas.width = jeu.width;
    jeu.context = jeu.canvas.getContext('2d');
    jeu.meta_canvas = document.createElement('canvas');
    jeu.meta_context = jeu.meta_canvas.getContext('2d');
    jeu.meta_canvas.height = jeu.height;
    jeu.meta_canvas.width = jeu.width;
    jeu.grid = [];
    jeu.groups = [200, 200, 200];
    jeu.gravity_x = 0;
    jeu.gravity_y = 1.15;
    jeu.spacing = 45;
    jeu.threshold = 210;
    jeu.num_x = Math.round(jeu.width / jeu.spacing) + 1;
    jeu.num_y = Math.round(jeu.height / jeu.spacing) + 1;
    jeu.fluid = new Fluid();

    run();

    function run() {
        requestAnimFrame(run);
        jeu.meta_context.clearRect(0, 0, jeu.width, jeu.height);
        for (var i = 0, l = jeu.num_x * jeu.num_y; i < l; i++)
            jeu.grid[i].length = 0;
        jeu.fluid.update();
        jeu.fluid.render();
    }

    //create some objects

    Palier.init();

    for(var i = 0; i < 3; ++i) {
        var palier = new Palier();
        palier.init({
            x: Math.random() * jeu.width,
            y: Math.random() * jeu.height,
            height: 10,
            width: 100,
            angle: 0.5
        })
        jeu.fluid.particles.push(palier);
    }


    setInterval(function(){
        var particle = new Gouttelette();
        particle.init({
            type: 1,
            x: 50,
            y: 20,
            radius: 30
        })
        jeu.fluid.particles.push(particle);
    }, 1000);




};