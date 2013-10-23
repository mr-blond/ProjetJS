define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Carte.html'),
        Kinetic             = require('kinetic'),
        io                  = require('socketio'),
        template = _.template(tpl),
        myself              ="",
        socket              ="";

    return Backbone.View.extend({

        initialize: function (options) {
            myself = this;
            myself.render();
             socket = io.connect('http://192.168.31.35:8080');
            model: options.model;
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
             console.log('fin drawTheBarre');
             rect.on('dragmove', function() {
                 console.log('onMove');
                 console.log(this);
                 //reasigné au model backbone les nouvelles valeurs
                 myself.model.set({x:this.attrs.x,y:this.attrs.x});
                 //envoyer le tout au serveur pour afficher la nouvelle position sur l'autre écran
                 console.log(myself.model);
                socket.emit('targetMove',{
                    id : myself.model.get('id'),
                    x : myself.model.get('y'),
                    y : myself.model.get('y')
                }); // Transmet le message aux autres
             
             }); 
        }

    });

});