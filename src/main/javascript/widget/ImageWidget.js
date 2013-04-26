/*global window*/
define(["jquery", "widget/SlidingWidget"],
    function ($, SlidingWidget) {
        "use strict";

        /**
         * Widget for displaying an image.
         * The image is automatically scaled to fit however large the widget is, while preserving its aspect ratio.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param parameters
         * @param presets
         */
        function ImageWidget(parameters, presets) {
            SlidingWidget.call(this, parameters, presets);

            this.element.addClass("ImageWidget");

            this.image = $("<img src='" + this.options.src + "'/>").
                appendTo(this.element);

            var scope = this;
            this.on("resize", function () {
                scope._resize();
            });

            this.image.on("load", function () {
                scope._resize();
            });
        }
        ImageWidget.prototype = Object.create(SlidingWidget.prototype);

        ImageWidget.prototype._resize = function () {
            var win = $(window);

            if (win.height() / win.width() < this.image.height() / this.image.width()) {
                this.element.addClass("windowIsWider");
            } else {
                this.element.removeClass("windowIsWider");
            }
        };

        return ImageWidget;
    });