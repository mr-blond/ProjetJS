define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "drawBarreScreen": "drawBarreScreen",
            "createCreature": "createCreature",
            "tchat" : "tchat"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
            console.log('dans home');
        },

        drawBarreScreen: function (id) {
            console.log('drawBarreScreen');
            require(["app/models/Barre", "app/views/Barre"], function (models, view) {
                var barreModel = new models.Barre();
                var rectangleView = new view({ model: barreModel });
               console.log( barreModel.get('x'));
               barreModel.set({'x':15});
                console.log( barreModel.get('x'));
                slider.slidePage(rectangleView.$el);
                  console.log('drawBarreScreen ready');
            });
        },
        
        createCreature : function (){
            console.log('createCreature');
        },
        
        tchat : function (){
            console.log('dans le tchat');
            require( ["app/views/tchat"], function (view) {
              
                slider.slidePage(new view().$el);
                  console.log('drawBarreScreen ready');
            });
        }

       
    });

});