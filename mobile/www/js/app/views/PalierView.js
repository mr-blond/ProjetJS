define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/PalierTpl.html'),
        Kinetic             = require('kinetic'),
        io                  = require('socketio'),
        template = _.template(tpl),
        myself,
        timer,
        socket,
        layer,
        currentIndex,
        allKineticPlateform = [],
        
        deviceOrientationHandler = function(tiltLR, tiltFB, dir, motUD){
            myself.rotateBar(Math.round(tiltLR));
            myself.sendData();
        }
        
    ;

    return Backbone.View.extend({
       
        initialize: function (options) {
            myself = this;
            myself.render();
            socket = io.connect('http://10.188.49.155:8080');
            
            this.collection = options.collection;
           
        },

        render: function () {
            myself.$el.html(template());
            //myself.createTheStage();
            return this;
        },
        createTheStage : function(){
            //preparation du canvas
            var stage = new Kinetic.Stage({
                width: 633,
                height: 300 ,        
                container: 'whereToPutCanvas'
            });
             
          
            layer = new Kinetic.Layer();
            
            stage.add(layer);
            
        },
        drawTheBarres : function(){
            
            var currentPalier = '';
             myself.collection.each(function(barre) {
                //console.log(barre);
                //à partir de la collection, créer toutes les plateformes
                currentPalier = new Kinetic.Rect(barre.toJSON());
                
                //les ajouter sur le stage
                layer.add(currentPalier);
               // console.log(currentPalier);

                currentPalier.on('dragstart', function(me) {
                    
                    timer=setInterval(myself.sendData, 300);
                    currentIndex = me.targetNode.index;
                   
                });

                currentPalier.on('dragend', function() {
                    //console.log('clear the interval');
                    clearInterval(timer);
                });
                allKineticPlateform.push(currentPalier);
            });
            layer.draw();
            
           
            
             
        },
        rotateListener : function() {
            window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = eventData.beta;

            // alpha is the compass direction the device is facing in degrees
            var dir = eventData.alpha

            // deviceorientation does not provide this data
            var motUD = null;

            // call our orientation event handler
            deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
            }, false);
        },
        rotateBar: function(deg){
            var currentRect = allKineticPlateform[currentIndex];
            currentRect.setRotationDeg(deg);
           
        },
        sendData : function(){
            var currentRect = allKineticPlateform[currentIndex];
            var currentModel = myself.collection.get(currentIndex)
            currentModel.set({x:currentRect.attrs.x,y:currentRect.attrs.y,rotation:currentRect.getRotationDeg()});
            socket.emit('slide', {'pos': Math.floor(Math.random()* 110),'pin':11});
            //envoyer le tout au serveur pour afficher la nouvelle position sur l'autre écran
            socket.emit('targetMove',{
                id : currentModel.get('id'),
                x : currentModel.get('x'),
                y : currentModel.get('y'),
                rotation : currentModel.get('rotation')
            }); // Transmet le message aux autres
        }

    });

});