/*global window*/
define(["jquery", "widget/SlidingWidget"],
    function ($, SlidingWidget) {
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
            SlidingWidget.call(this, options);

            this.element.addClass("ImageWidget");

            this.image = $("<img src='" + this.options.src + "'/>").
                appendTo(this.element);

            var scope = this;
            this.on("resize", function () {
                scope._setScalingDimension();
            });

            this.image.on("load", function () {
                scope._setScalingDimension();
            });
        }
        ImageWidget.prototype = Object.create(SlidingWidget.prototype);

        /**
         * Set the image to scale to either height or width, so that it is always as large as possible without being larger than the window.
         * @private
         */
        ImageWidget.prototype._setScalingDimension = function () {
            var win = $(window);

            if (win.height() / win.width() < this.image.height() / this.image.width()) {
                this.element.addClass("windowIsWider");
            } else {
                this.element.removeClass("windowIsWider");
            }
        };

        return ImageWidget;
    });