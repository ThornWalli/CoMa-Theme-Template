"use strict";

var PositionObserver = require('../../../base/scroll/PositionObserver');
var youtube = require('../../../services/youtube');
var UrlParse = require('url-parse');
var viewport = require('../../../services/viewport');

module.exports = PositionObserver.extend({
    api: null,
    player: null,
    played: false,
    ready: false,
        modelConstructor: PositionObserver.prototype.modelConstructor.extend({
        session: {
            id: {
                type: 'string',
                default: null
            },
            src: {
                type: 'string',
                default: null
            },
            inviewAutoplay: {
                type: 'boolean',
                default: false
            }


        }
    }),

    initialize: function() {
        PositionObserver.prototype.initialize.apply(this, arguments);
        var scope = this;
        youtube.register(function(api) {
            scope.api = api;
            scope.setup();
        });

    },

    setup: function() {
        console.log('setupPlayer', this.el.getAttribute('id'), this.api);
        var url = UrlParse(this.model.src, true);
        url.query.enablejsapi = 1;
        console.log(url.toString());
        this.el.setAttribute('src', url.toString());
        this.player = new this.api.Player(this.el.getAttribute('id'), {
            events: {
                'onReady': this.onReady.bind(this),
                'onStateChange': this.onStateChange.bind(this)
            }
        });
    },

    onReady: function() {
        console.log('ready', this.el.getAttribute('id'), arguments);
        this.ready = true;
        viewport.update();
    },
    onStateChange: function() {},

    onActive: function() {
        if (!this.played && this.ready && this.model.inviewAutoplay) {
            this.player.playVideo();
            this.played = true;
        }
    },
    onInactive: function() {
        if (this.played && this.ready && this.model.inviewAutoplay) {
            this.player.pauseVideo();
            this.played = false;
        }
    }

});
