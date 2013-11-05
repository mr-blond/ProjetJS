require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        socketio : 'http://192.168.31.35:8080/socket.io/socket.io.js'
    },

    map: {
        
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'socketio': {
        exports: 'io'
      }
    }
});

require(['jquery', 'backbone', 'app/router', 'box2d'], function ($, Backbone, Router, Box2D) {

    console.log('box 2d');
    console.log(Box2D);

    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
});