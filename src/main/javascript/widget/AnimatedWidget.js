/*global setTimeout, window */
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

            if (this.options.from || this.options.fadeIn) {
                this.hide();

                var scope = this;

                this.on("activate", function () {
                    scope.initialized.done(function () {
                        scope._positionOutsideFrame();
                        scope.show();
                        scope._animateToOppositeEdge(scope.options.duration,
                                                     scope.options.timingFunction,
                                                     scope.options.delay);
                    });
                });

                this.on("deactivate", function () {
                    scope.hide();
                });

                this.on("resize", function () {
                    if (scope.active) {
                        // Reset the animation target position.
                        scope._animateToOppositeEdge("0", "ease", "0");
                    }
                });
            }
        }
        AnimatedWidget.prototype = Object.create(BaseWidget.prototype);

        /**
         * Position the widget just offscreen so it is ready to slide in.
         * 
         * @private
         */
        AnimatedWidget.prototype._positionOutsideFrame = function () {
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
                break;
            }

            var animation = {
                top: y,
                left: x
            };

            if (this.options.fadeIn) {
                animation.opacity = 0;
            }

            this.element.animate(animation, 0);
        };

        /**
         * Animate the widget moving to the opposite edge of the window.
         *
         * @param {String} [duration=1000] The animation duration.
         * @param {String} [timingFunction=ease] The animation timing function as a CSS string, e.g. "ease".
         * @param {String} [delay=0] The animation start delay.
         * @private
         */
        AnimatedWidget.prototype._animateToOppositeEdge = function (duration, timingFunction, delay) {
            var durationInt = duration ? parseInt(duration, 10) : 1000,
                delayInt = delay ? parseInt(delay, 10) : 500;
            timingFunction = timingFunction || "ease";

            var x = 0,
                y = 0;

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
            window.setTimeout(function () {
                var animation = {
                    top: y,
                    left: x
                };

                if (scope.options.fadeIn) {
                    animation.opacity = 1;
                }

                scope.element.animate(animation, durationInt, timingFunction);
            }, delayInt);
        };

        return AnimatedWidget;
    });