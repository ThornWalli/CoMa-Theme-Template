"use strict";

var PositionObserver = require('agency-pkg-base/scroll/PositionObserver');
var Swiper = require('swiper');
require("style!swiper/dist/css/swiper.css");

module.exports = PositionObserver.extend({
    swiper: null,
    visible: false,
    init: false,

    modelConstructor: PositionObserver.prototype.modelConstructor.extend({
        session: {
            loop: {
                type: 'boolean',
                default: false
            },
            effect: {
                type: 'string',
                default: 'slide'
            },
            autoplay: {
                type: 'number',
                default: null
            },
            speed: {
                type: 'number',
                default: 1200
            }
        }
    }),

    initialize: function() {
        PositionObserver.prototype.initialize.apply(this, arguments);
        var config = {
            loop: this.model.loop,
            effect: this.model.effect,
            autoplay: this.model.autoplay,
            speed: this.model.speed,
            onInit: function() {
                this.el.classList.add('js-slider-init');
                this.init = true;
            }.bind(this)
        };
        if (this.el.querySelector('.swiper-pagination')) {
            config.pagination = '.swiper-pagination';
        }
        if (this.el.querySelector('.swiper-button-next')) {
            config.nextButton = '.swiper-button-next';
        }
        if (this.el.querySelector('.swiper-button-prev')) {
            config.prevButton = '.swiper-button-prev';
        }

        this.swiper = new Swiper(this.el, config);

    },

    onActive: function() {
        if (!this.visible) {
            if (this.init) {
                this.swiper.startAutoplay();
            }
            this.visible = true;
        }
    },

    onInactive: function() {
        if (this.init && this.visible) {
            this.swiper.stopAutoplay();
        }
        this.visible = false;
    }
});
