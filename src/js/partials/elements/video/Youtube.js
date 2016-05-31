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
    firstActive: true,
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
        this.iframe = this.el.querySelector('iframe');
    },

    setup: function(callback) {
        var id = this.iframe.getAttribute('id');
        console.log('setupPlayer', id, this.api);
        var url = UrlParse(this.model.src, true);
        url.query.enablejsapi = 1;
        console.log(url.toString());
        this.iframe.setAttribute('src', url.toString());
        this.player = new this.api.Player(id, {
            events: {
                'onReady': function() {
                    this.onReady.bind(this)();
                    callback.bind(this)();
                }.bind(this),
                'onStateChange': this.onStateChange.bind(this)
            }
        });
    },

    onReady: function() {
        this.ready = true;
        viewport.update();
        this.el.classList.add('js-ready');
    },
    onStateChange: function() {},

    onActive: function() {
        var scope = this;
        if (this.firstActive) {
            this.firstActive = false;
            youtube.register(function(api) {
                scope.api = api;
                scope.setup(function() {
                    if (!this.played && this.ready && this.model.inviewAutoplay) {
                        this.player.playVideo();
                        this.played = true;
                    }
                });
            });
        } else if (!this.played && this.ready && this.model.inviewAutoplay) {
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
