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
        new jeu.b2Vec2(0, 9.8)    //gravity
        ,  true                 //allow sleep
    );

    jeu.fixDef = new jeu.b2FixtureDef;
    jeu.fixDef.density = 1.0;
    jeu.fixDef.friction = 0.5;
    jeu.fixDef.scale = 100;
    jeu.fixDef.restitution = 0.2;

    jeu.bodyDef = new jeu.b2BodyDef;

    jeu.width = 1280;
    jeu.height = 720;

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

    jeu.generateur = new GenerateurGouttelette();
    jeu.generateur.add({cooldown: 15});
    Palier.init();
    Level.init();
    Debuger.init();

    function run() {
        requestAnimFrame(run);
        jeu.meta_context.clearRect(0, 0, jeu.width, jeu.height);
        for (var i = 0, l = jeu.num_x * jeu.num_y; i < l; i++)
            jeu.grid[i].length = 0;
        jeu.fluid.update();
        jeu.fluid.render();
        Debuger.update();
        Palier.render();
        jeu.generateur.affiche();
    }
    run();

};