define(function (require) {

    "use strict";
    console.log('Chercher les fichiers necessaires');
    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        Barre               = require('../models/PalierModel');
        console.log('Création de la variable Barre');
      var  Barres = Backbone.Collection.extend({

            model: Barre
            //chercher la totalité des barres ave cette url
           // url: "http://localhost:3000/barres"

        });

    return {
        
        PalierCollection: Barres
    };

});
