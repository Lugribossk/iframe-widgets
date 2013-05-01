/*global setTimeout, window */
define(["jquery", "widget/AbstractWidget", "util/Browser"],
    function ($, AbstractWidget, Browser) {
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
        function SlidingWidget(options) {
            AbstractWidget.call(this, options);

            this.element.addClass("SlidingWidget");

            var from = this.options.from;
            if (from) {
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

                // TODO ???
//                this.on("resize", function () {
//                    if (scope.active) {
//                        // Reset the animation target position.
//                        scope._animateToOppositeEdge("0");
//                    }
//                });
            }
        }
        SlidingWidget.prototype = Object.create(AbstractWidget.prototype);

        /**
         * Position the widget just offscreen so it is ready to slide in.
         * 
         * @private
         */
        SlidingWidget.prototype._positionOutsideFrame = function () {
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

            this.element.css({
                transition: "none",
                transform: "translate3d(" + x + "px, " + y + "px, 0)"
            });
        };

        /**
         * Animate the widget moving to the opposite edge of the window.
         *
         * @param {String} [duration=1s] The animation duration as a CSS string, e.g. "1s".
         * @param {String} [timingFunction=ease] The animation timing function as a CSS string, e.g. "ease".
         * @param {String} [delay=0] The animation start delay as a CSS string, e.g. "1s".
         * @private
         */
        SlidingWidget.prototype._animateToOppositeEdge = function (duration, timingFunction, delay) {
            duration = duration || "1s";
            timingFunction = timingFunction || "ease";
            delay = delay || "0";

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
            setTimeout(function () {
                scope.element.css({
                    transition: Browser.getCSSPrefix() + "transform " + duration + " " + timingFunction + " " + delay,
                    transform: "translate3d(" + x + "px, " + y + "px, 0)"
                });
            }, 0);
        };

        return SlidingWidget;
    });