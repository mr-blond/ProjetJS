define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/HomeView'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "drawPalierScreen": "drawPalierScreen"
            
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        drawPalierScreen: function () {
           
            require(["app/collection/PalierCollection","app/models/PalierModel", "app/views/PalierView"], function (collection,models, view) {
              console.log('dans drawBarreScreen');
              
              
              
              //créer la collection à partir des infos sur le serveur
              var maCollection = new collection.PalierCollection();
              
              var currentModel = '';
              for(var i=0;i<5;i++){
                  currentModel = new models.PalierModel({id:i,x:10*i,y:10*i});
                 
                  maCollection.add(currentModel);
              }
              
              var palierView = new view({collection:maCollection});
                homeView.delegateEvents();
                slider.slidePage(palierView.$el);
                palierView.createTheStage();
                palierView.drawTheBarres();
            });
        }
        
      

       
    });

});