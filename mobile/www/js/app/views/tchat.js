define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Tchat.html'),
        io                  = require('socketio'),
        template            = _.template(tpl),
        socket              ="",
        myPseudo              ='',
        mySelf              = '';

    return Backbone.View.extend({

        initialize: function () {
            mySelf = this;
            socket = io.connect('http://192.168.74.50:8080');
            mySelf.render();

        },

        render: function () {
            mySelf.$el.html(template());

   
    
            // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
            myPseudo = prompt('Quel est votre pseudo ?');
          
            socket.emit('nouveau_client', myPseudo);
            document.title = myPseudo + ' - ' + document.title;
            // Quand un nouveau client se connecte, on affiche l'information
            socket.on('nouveau_client', function(pseudo) {
               
                $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
            }),
                    
            // Quand on reçoit un message, on l'insère dans la page
            socket.on('message', function(data) {
                mySelf.insereMessage(data.pseudo, data.message);
            }),
                    
            mySelf.$el.find('#message').change(function(){
               console.log('draw smthng');
                var message = $('#message').val();
                socket.emit('message', message); // Transmet le message aux autres
                mySelf.insereMessage(myPseudo, message); // Affiche le message aussi sur notre page
                
             })  ;

            return this;
        },
        test : function(){

            var message = $('#message').val();
        
                socket.emit('message', message); // Transmet le message aux autres
                mySelf.insereMessage(myPseudo, message); // Affiche le message aussi sur notre page
                $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
               
        },
        insereMessage : function (pseudo, message) {
                mySelf.$el.find('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
            }


    });

});