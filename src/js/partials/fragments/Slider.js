"use strict";

var ScrollObserver = require('../../base/controller/ScrollObserver');
var Swiper = require('swiper');

module.exports = ScrollObserver.extend({
    swiper: null,
    visible: false,
    init: false,

    modelConstructor: ScrollObserver.prototype.modelConstructor.extend({
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
        ScrollObserver.prototype.initialize.apply(this, arguments);
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

    onActive: function(info) {
        console.log(info.y);
        if (!this.visible) {
            if (this.init) {
                this.swiper.startAutoplay();
            }
            this.visible = true;
        }
    },

    onInactive: function() {

        this.visible = false;
        if (this.init) {
            this.swiper.stopAutoplay();
        }
    }
});
