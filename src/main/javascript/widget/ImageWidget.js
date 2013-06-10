/*global window*/
define(["jquery", "widget/AnimatedWidget"],
    function ($, AnimatedWidget) {
        "use strict";

        /**
         * Widget for displaying an image.
         *
         * The image is automatically scaled to fit however large the widget is, while preserving its aspect ratio.
         * Also works with SVGs.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param options
         */
        function ImageWidget(options) {
            AnimatedWidget.call(this, options);

            this.element.addClass("ImageWidget");

            this.image = $("<img src='" + this.options.src + "'/>")
                .appendTo(this.element);

            var scope = this;
            this.on("resize", function () {
                scope._setScalingDimension();
            });

            this.image.on("load", function () {
                scope._setScalingDimension();
                scope.initialized.resolve();
            });
        }
        ImageWidget.prototype = Object.create(AnimatedWidget.prototype);

        /**
         * Set the image to scale to either height or width, so that it is always as large as possible without being larger than the window.
         * @private
         */
        ImageWidget.prototype._setScalingDimension = function () {
            var win = $(window);

            if (win.height() / win.width() < this.image.height() / this.image.width()) {
                this.element.addClass("windowIsWider");

                // iOS 6 seems to sometimes interpret 100% high as taller than the window, so force the height to be correct.
                this.element.height(win.height());
            } else {
                this.element.removeClass("windowIsWider");
            }
        };

        return ImageWidget;
    });