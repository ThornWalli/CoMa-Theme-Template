"use strict";

require("style!mediaelement/build/mediaelementplayer.min.css");
var device = require('device.js');
var mejs = require('exports?mejs!imports?jQuery=jquery!mediaelement/build/mediaelement-and-player');
var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');

module.exports = Controller.extend({
    modelConstructor: DomModel.extend({
        session: {
            defaultVideoWidth: {type: 'string', required: true, default: '100%'},
            defaultVideoHeight: {type: 'string', required: true, default: '100%'},
            videoWidth: {type: 'string', required: true, default: '100%'},
            videoHeight: {type: 'string', required: true, default: '100%'},
            enablePluginDebug: {type: 'boolean', required: true, default: false},
            plugins: {type: 'array', required: true, default: function() {return [];}},
            startVolume: {type: 'number', required: true, default: 0.8},
            loop: {type: 'boolean', required: true, default: false},
            enableAutosize: {type: 'boolean', required: true, default: true},
            features: {type: 'array', required: true, default: function() {return ['playpause','progress','current','duration','tracks','volume','fullscreen'];}},
            alwaysShowControls: {type: 'boolean', required: true, default: false},
            alwaysShowHours: {type: 'boolean', required: true, default: false},
            showTimecodeFrameCount: {type: 'boolean', required: true, default: false},
            framesPerSecond: {type: 'number', required: true, default: 25},
            enableKeyboard: {type: 'boolean', required: true, default: true},
            pauseOtherPlayers: {type: 'boolean', required: true, default: true},
            keyActions: {type: 'array', required: true, default: function() { return [];}},
            error: {type: 'any', required: true, default: function() {
                return function () {
                    console.error('ERROR:', arguments);
                };
            }},
            success: {type: 'any', required: true, default: function() {
                return function () {
                    console.log('SUCCESS:', arguments);
                };
            }}
        },
        derived: {
            config: {
                deps: [],
                fn: function () {
                    return this.getAttributes({
                        session: true
                    });
                }
            }
        }
    }),

    constructor: function(options) {
        //Check if video is embedded into modal - define target to receive open flag by modal
        options.target = $(options.el).closest('.partial[data-partial="layouts/modal"]');
        Controller.prototype.constructor.apply(this, arguments);
    },

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

        $('poster', this.el).addClass('js-active');
        if($('> video > source', this.el).length) {
            this.create();
        }
    },

    create: function() {
        if(device().mobile()) {
            this.model.success = onMobileSuccess.bind(this);
            new mejs.MediaElement(this.el.querySelector('video'), this.model.config);
        } else {
            this.model.success = onSuccess.bind(this);
            new mejs.MediaElementPlayer(this.el.querySelector('video'), this.model.config);
        }
    }
});

function onSuccess(mediaElement) {
    $('picture', this.el).on('click', function() {
        mediaElement.play();
    });
    $(mediaElement).on('loadeddata', function() {
        // fix: to resize player to full size when hls video is loaded
        $(window).trigger('resize');
    }.bind(this));
    $(mediaElement).on('playing', function() {
        $('picture', this.el).removeClass('js-active');
    }.bind(this));
    $(mediaElement).on('ended', function() {
        $('picture', this.el).addClass('js-active');
    }.bind(this));

    if(this.targetModel) {
        //Check if modal was closed
        this.targetModel.on('change:open', function(model, value) {
            if(!value) {
                resetVideo(mediaElement);
            }
        }.bind(this));

        //Autoplay when modal was opened
        if(this.targetModel.open) {
            mediaElement.play();
        }
    }
}

function onMobileSuccess(mediaElement, domObject) {
    $(mediaElement).on('click', function() {
        requestFullscreen(mediaElement);
    });
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', onFullscreenChange.bind(mediaElement));
    $(domObject).on('webkitendfullscreen', onFullscreenChange.bind(mediaElement));
}

function requestFullscreen(mediaElement) {
    mediaElement.play();
    if(mediaElement.requestFullscreen) {
        mediaElement.requestFullscreen();
    } else if(mediaElement.mozRequestFullScreen) {
        mediaElement.mozRequestFullScreen();
    } else if(mediaElement.webkitRequestFullscreen) {
        mediaElement.webkitRequestFullscreen();
    } else if(mediaElement.webkitEnterFullscreen) {
        mediaElement.webkitEnterFullscreen();
    } else if(mediaElement.msRequestFullscreen) {
        mediaElement.msRequestFullscreen();
    }
}

function onFullscreenChange() {
    if(!isFullscreen()) {
        resetVideo(this);
    }
}

function resetVideo(mediaElement) {
    mediaElement.setCurrentTime(0);
    mediaElement.pause();
//        mediaElement.load();
}

function isFullscreen() {
    return !!getFullscreenElement();
}

function getFullscreenElement() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}
