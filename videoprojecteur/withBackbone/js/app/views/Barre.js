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
        renderCollection: function(options) {
            options = options || {};
            options.target = options.target || this.$el;
            options.collection = options.collection || this.collection;

            //- reset views
            if (!options.add) {
                this.disposeViews();
            } else {
                this._subviews = [];
            }

            this._renderOptions = options;
            //- if there is a collection and a view then render it
            if (options.collection && this.view) {
                options.collection.each(this._renderView, this);
            }
            return this;
        },
        _renderView: function(model) {
            this._renderOptions.target.append(
                this.createView(model, this._renderOptions.args || {}).render().$el
            );
        },
        createView: function(model, options) {
            var indexOfNewView = this._subviews.length;
            this._subviews.push(new this.view(_.extend({
                    model: model
                },
                options
            )));
            return this._subviews[indexOfNewView];
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