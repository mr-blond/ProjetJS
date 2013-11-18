require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        //@todo, trouver un moyen de chercher la valeur de l'adresse ip automatiquement
        socketio : 'http://10.188.49.155:8080/socket.io/socket.io.js'
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

require([/*'jquery',*/ 'backbone', 'app/router'], function (/*$, */Backbone, Router) {

    var router = new Router();
/*
    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });
*/
    Backbone.history.start();
});