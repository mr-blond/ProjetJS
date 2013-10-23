define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Barre = Backbone.Model.extend({

            urlRoot: "http://localhost:8080/barres",
            // ici sont les propriété pour décrire l'objet bar
            defaults: {
                x: 0,
                y: 0,
                width: 100,
                height: 50,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4,
                offset: [0, 0],
                draggable: true,
            },
            initialize: function () {
                this.reports = new BarreCollection();
                this.reports.url = this.urlRoot + "/" + this.id + "/reports";
            }
            
            

        }),

        BarreCollection = Backbone.Collection.extend({

            model: Barre,
            //chercher la totalité des barres ave cette url
            url: "http://localhost:3000/barres"

        });

    return {
        Barre: Barre,
        BarreCollection: BarreCollection
    };

});