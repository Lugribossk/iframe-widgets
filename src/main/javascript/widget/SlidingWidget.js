/*global setTimeout, window */
define(["jquery", "widget/AbstractWidget"],
    function ($, AbstractWidget) {
        "use strict";

        /**
         * Widget that slides in from offscreen, ending next to the opposite edge.
         * 
         * Uses translate3d to take advantage of hardware acceleration.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object|QueryParameters} [parameters]
         * @param {Object} [presets]
         */
        function SlidingWidget(parameters, presets) {
            AbstractWidget.call(this, parameters, presets);

            this.element.addClass("SlidingWidget");

            var from = this.options.from;
            if (from) {
                this.hide();

                var scope = this;

                this.on("activate", function () {
                    scope._positionOutsideFrame();
                    scope.show();
                    scope._animateToOppositeEdge(scope.options.duration,
                                                 scope.options.timingFunction,
                                                 scope.options.delay);
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
                    // TODO Change to not be Webkit-specific
                    transition: "-webkit-transform " + duration + " " + timingFunction + " " + delay,
                    transform: "translate3d(" + x + "px, " + y + "px, 0)"
                });
            }, 0);
        };

        return SlidingWidget;
    });