define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Carte.html'),
        Kinetic             = require('kinetic'),
        io                  = require('socketio'),
        template            = _.template(tpl),
        myself              = "",
        socket              = "";

    return Backbone.View.extend({

        initialize: function (options) {
            myself = this;
            this.barres = this.collection.myself.toJSON();
            console.log(this.barres);
            myself.initPos();
            myself.render();
            socket = io.connect('http://192.168.31.35:8080');
            model: options.model;
        },
        initPos: function (){

            for(var i = 0; i < 10; i++)
            {
                new myself.model;
            }


            //Définition de toute les coordonnées de départ
            socket.emit('init_position', {

            });

        },
        render: function () {
            myself.$el.html(template());
            myself.drawTheBarre();
            return this;
        },
        drawTheBarre : function(){
            console.log('drawTheBarre');
            var stage = new Kinetic.Stage({
                container: myself.el,
                width: $(window).width(),
                height: $(window).height()                    
            });
            var layer = new Kinetic.Layer();
            console.log(myself.model.toJSON());
            var rect = new Kinetic.Rect(myself.model.toJSON());
            layer.add(rect);
            stage.add(layer);
        }

    });

});