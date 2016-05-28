"use strict";

var Controller = require('../../../base/Controller');
var DomModel = require('../../../base/DomModel');

module.exports = Controller.extend({

    modelConstructor: DomModel.extend({
        session: {
            opened: {
                type: 'boolean',
                required: true,
                default: false
            }
        }
    }),

    events: {
        'click label': onClickLabel
    },

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);


    }

});

function onClickLabel() {
    toggle(this);
}


function toggle(scope, opened) {
    var html = (document.documentElement || document.body.parentElement);
    if (opened !== undefined) {
        scope.model.opened = opened;
    } else {
        opened = !scope.model.opened;
    }
    if (!opened || html.classList.contains('js-header-menu-open')) {
        html.classList.remove('js-header-menu-open');
    } else {
        html.classList.add('js-header-menu-open');
    }
}
