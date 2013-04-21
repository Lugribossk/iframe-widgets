/*global vjs, window*/

//
(function () {
    "use strict";

    var YTPlayerState = {
        BUFFERING: 3,
        CUED: 5,
        ENDED: 0,
        PAUSED: 2,
        PLAYING: 1,
        UNSTARTED: -1
    };

    /**
     * Player "tech" for Video.js that allows it to control a Youtube player in another frame.
     *
     * Heavily based on https://github.com/eXon/videojs-youtube
     *
     * @author Bo Gotthardt
     */
    vjs.Widget = vjs.MediaTechController.extend({
        init: function (player, options, ready) {
            vjs.MediaTechController.call(this, player, options, ready);

            this.player_ = player;
            this.ytplayer = player.options().ytPlayer;

            var scope = this;
            this.ytplayer.addEventListener("onReady", function () {
                scope.onReady();
            });
            this.ytplayer.addEventListener("onStateChange", function (state) {
                scope.onStateChange(state);
            });
            this.ytplayer.addEventListener("onError", function (error) {
                scope.onError(error);
            });

            window.setTimeout(function () {
                scope.player_.bigPlayButton.hide();
                scope.player_.controlBar.show();
                scope.player_.controlBar.fullscreenToggle.hide();
            }, 50);
        }
    });

    vjs.Widget.prototype.play = function () {
        if (this.isReady_) {
            this.ytplayer.playVideo();
        } else {
            // We will play it when the API will be ready
            this.playOnReady = true;
        }
    };

    vjs.Widget.prototype.pause = function () {
        this.ytplayer.pauseVideo();
    };

    vjs.Widget.prototype.paused = function () {
        return this.lastState !== YTPlayerState.PLAYING &&
               this.lastState !== YTPlayerState.BUFFERING;
    };

    vjs.Widget.prototype.currentTime = function () {
        return this.ytplayer.getCurrentTime();
    };

    vjs.Widget.prototype.setCurrentTime = function (seconds) {
        this.ytplayer.seekTo(seconds, true);
        this.player_.trigger('timeupdate');
    };

    vjs.Widget.prototype.duration = function () {
        return this.ytplayer.getDuration();
    };

    vjs.Widget.prototype.buffered = function () {
        var loadedBytes = this.ytplayer.getVideoBytesLoaded();
        var totalBytes = this.ytplayer.getVideoBytesTotal();
        if (!loadedBytes || !totalBytes) {
            return 0;
        }

        var duration = this.ytplayer.getDuration();
        var secondsBuffered = (loadedBytes / totalBytes) * duration;
        var secondsOffset = (this.ytplayer.getVideoStartBytes() / totalBytes) * duration;
        return vjs.createTimeRange(secondsOffset, secondsOffset + secondsBuffered);
    };

    vjs.Widget.prototype.volume = function () {
        if (isNaN(this.volumeVal)) {
            this.volumeVal = this.ytplayer.getVolume() / 100.0;
        }

        return this.volumeVal;
    };

    vjs.Widget.prototype.setVolume = function (percentAsDecimal) {
        if (percentAsDecimal && percentAsDecimal !== this.volumeVal) {
            this.ytplayer.setVolume(percentAsDecimal * 100.0);
            this.volumeVal = percentAsDecimal;
            this.player_.trigger('volumechange');
        }
    };


    vjs.Widget.prototype.muted = function () {
        return this.ytplayer.isMuted();
    };

    vjs.Widget.prototype.setMuted = function (muted) {
        if (muted) {
            this.ytplayer.mute();
        } else {
            this.ytplayer.unMute();
        }
    };


    vjs.Widget.prototype.supportsFullScreen = function () {
        return false;
    };

    vjs.Widget.prototype.onReady = function () {
        this.isReady_ = true;

        this.player_.trigger('techready');

        this.triggerReady();
        this.player_.trigger('durationchange');

        // Play right away if we clicked before ready
        if (this.playOnReady) {
            this.ytplayer.playVideo();
        }
    };

    vjs.Widget.prototype.onStateChange = function (event) {
        var state = event.data;
        if (state !== this.lastState) {
            switch (state) {
            case -1:
                this.player_.trigger('durationchange');
                break;

            case YTPlayerState.ENDED:
                this.player_.trigger('ended');
                break;

            case YTPlayerState.PLAYING:
                this.player_.trigger('timeupdate');
                this.player_.trigger('durationchange');
                this.player_.trigger('playing');
                this.player_.trigger('play');
                break;

            case YTPlayerState.PAUSED:
                this.player_.trigger('pause');
                break;

            case YTPlayerState.BUFFERING:
                this.player_.trigger('timeupdate');
                this.player_.trigger('waiting');

                break;

            case YTPlayerState.CUED:
                break;
            }

            this.lastState = state;
        }
    };

    vjs.Widget.prototype.onError = function (error) {
        this.player_.error = error;
        this.player_.trigger('error');
    };

    vjs.Widget.isSupported = function () {
        return true;
    };

    vjs.Widget.canPlaySource = function () {
        return true;
    };

    // Disable the control bar fading out, as it does not make sense in this setup.
    vjs.ControlBar.prototype.fadeOut = function () {};
}());