define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {

            this.render();
        },

        render: function () {
            this.$el.html(template());
           // this.listView = new EmployeeListView({collection: this.employeeList, el: $(".scroller", this.el)});
            return this;
        }


    });

});