/*global window */
define(["jquery", "widget/BaseWidget", "lib/jquery.animate-enhanced"],
    function ($, BaseWidget) {
        "use strict";

        /**
         * Widget that slides in from offscreen, ending next to the opposite edge.
         * 
         * Uses translate3d to take advantage of hardware acceleration.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object} options
         */
        function AnimatedWidget(options) {
            BaseWidget.call(this, options);

            this.element.addClass("AnimatedWidget");
            this._delayedAnimation = null;

            if (this.options.from || this.options.fadeIn) {
                this.hide();

                var scope = this;

                this.on("activate", function () {
                    scope.initialized.done(function () {
                        scope._setupStartPosition();
                        scope.show();

                        var duration = (scope.options.duration !== undefined ? parseInt(scope.options.duration, 10) : 1000),
                            delay = (scope.options.delay !== undefined ? parseInt(scope.options.delay, 10) : 500),
                            timingFunction = scope.options.timingFunction || "ease";

                        scope._animateIn(duration, timingFunction, delay);
                    });
                });

                this.on("deactivate", function () {
                    scope.hide();
                });

                this.on("resize", function () {
                    if (scope.active) {
                        // Reset the animation target position.
                        scope._animateIn(0, "ease", 0);
                    }
                });
            }
        }
        AnimatedWidget.prototype = Object.create(BaseWidget.prototype);

        /**
         * Set up the widget so it is ready for the animation to start.
         * 
         * @private
         */
        AnimatedWidget.prototype._setupStartPosition = function () {
            var x = 0,
                y = 0;

            switch (this.options.from) {
            case "top":
                y = -this.element.height();
                break;
            case "bottom":
                y = $(window).height();
                break;
            case "left":
                x = -this.element.width();
                break;
            case "right":
                x = $(window).width();
                // On iOS 6, if the element is even partially outside the right edge of the window, it's shifted upwards
                // a little while animating in. Setting y to even -1 make it a lot less apparent.
                y = -1;
                break;
            }

            var startPosition = {
                top: y,
                left: x
            };

            if (this.options.fadeIn) {
                startPosition.opacity = 0;
            }

            this.element.css(startPosition);
        };

        /**
         * Do the widget activation animation.
         *
         * @param {Number} duration The animation duration, in milliseconds.
         * @param {String} timingFunction The animation timing function as a CSS string, e.g. "ease".
         * @param {Number} delay The animation start delay, in milliseconds.
         * @private
         */
        AnimatedWidget.prototype._animateIn = function (duration, timingFunction, delay) {
            // On iOS 6 animating to 0 makes the animation immediately jump to the end position, then start from there.
            // But animating it to "=0" works...
            var x = "=0",
                y = "=0";

            switch (this.options.from) {
            case "top":
                y = $(window).height() - this.element.height();
                break;
            case "left":
                x = $(window).width() - this.element.width();
                break;
            // Right and bottom both just reset to 0.
            }

            var scope = this;
            window.clearTimeout(this._delayedAnimation);
            this._delayedAnimation = window.setTimeout(function () {
                var animation = {
                    top: y,
                    left: x
                };

                if (scope.options.fadeIn) {
                    animation.opacity = 1;
                }

                scope.element.animate(animation, duration, timingFunction);
            }, delay);
        };

        return AnimatedWidget;
    });