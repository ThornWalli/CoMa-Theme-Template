"use strict";

var youtube = function() {
    this.api = null;
    this.callbacks = [];
    global.onYouTubeIframeAPIReady = function() {
        this.api = global.YT;
        while(this.callbacks.length > 0) {
            var callback = this.callbacks.pop();
            if (typeof callback === 'function') {
                callback(this.api);
            }
        }
        this.callbacks = [];
    }.bind(this);
    $.getScript('https://www.youtube.com/iframe_api');
};
youtube.prototype.register = function(callback) {
    if (!!this.api) {
        callback(this.api);
    } else {
        this.callbacks.push(callback);
    }
};
module.exports = new youtube();
