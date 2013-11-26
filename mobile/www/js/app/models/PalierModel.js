define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        //Collection          = require('../collection/PalierCollection'),
        Barre = Backbone.Model.extend({

           // urlRoot: "http://localhost:8080/barre",
            // ici sont les propriété pour décrire l'objet bar
            defaults: {
                id:0,
                x: 0,
                y: 0,
                width: 130,
                height: 30,
                rotation: 0,
                fill: '#424242',
                stroke: 'white',
                strokeWidth: 2,
                //centrer l'element
                offset: [115, 15],
                draggable: true
            },
            initialize: function () {
               /* this.reports = new Collection.PalierCollection();
                this.reports.url = this.urlRoot + "/" + this.id + "/reports";*/
            }
            
            

        });

    return {
        PalierModel: Barre
       
    };

});