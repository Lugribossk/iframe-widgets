/*global window*/
define(["jquery", "widget/SlidingWidget", "util/WebFontLoader", "util/Logger"],
    function ($, SlidingWidget, WebFontLoader, Logger) {
        "use strict";
        var log = new Logger("TextWidget");

        /**
         * Widget for displaying text.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object|QueryParameters} [parameters]
         * @param {Object} [presets]
         */
        function TextWidget(parameters, presets) {
            SlidingWidget.call(this, parameters, presets);

            var scope = this;

            ["font-family", "color", "text-shadow", "opacity", "letter-spacing", "line-height"].forEach(function (property) {
                if (scope.options[property]) {
                    scope.element.css(property, scope.options[property]);
                }
            });

            var text = this.options.text.replace("\n", "<br/>");
            this.element.text(text)
                .addClass("TextWidget");

            var clazz = this.options["class"];
            if (clazz) {
                this.element.addClass(clazz);
            }

            var fontName = this.options["font-family"];
            if (fontName) {
                WebFontLoader.loadGoogle(fontName)
                    .done(function () {
                        if (this.activated) {
                            log.warn("Web font finished loading after widget activation.");
                        }
                        scope._matchTextSizeToWindow();
                    });
            } else {
                this._matchTextSizeToWindow();
            }

            this.on("resize", function () {
                scope._matchTextSizeToWindow();
            });
        }
        TextWidget.prototype = Object.create(SlidingWidget.prototype);

        TextWidget.prototype._matchTextSizeToWindow = function () {
            var win = $(window);
            // There's no way to scale some text to fit in a box with CSS.
            // But we can keep increasing the font size until the element is larger than the window.
            var size = 6;
            while (this.element.width() < win.width() &&
                    this.element.height() < win.height() &&
                    size < 10000) {
                this.setFontSize(++size);
            }
            this.setFontSize(size - 1);
        };

        TextWidget.prototype.setFontSize = function (size) {
            this.element.css({"font-size": size + "px"});
        };

        return TextWidget;
    });