define(["jquery", "widget/SlidingWidget", "util/QueryParameters", "util/WebFontLoader"],
    function ($, SlidingWidget, QueryParameters, WebFontLoader) {
        "use strict";

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

            ["font-family", "color", "text-shadow", "opacity", "letter-spacing"].forEach(function (property) {
                if (scope.parameters[property]) {
                    scope.element.css(property, scope.parameters[property]);
                }
            });

            var text = this.parameters.text.replace("\n", "<br/>");
            this.element.text(text)
                .addClass("TextWidget");

            var clazz = this.parameters["class"];
            if (clazz) {
                this.element.addClass(clazz);
            }

            var fontName = this.parameters["font-family"];
            if (fontName) {
                WebFontLoader.loadGoogle(fontName)
                    .done(function () {
//                        if (this.activated) {
//                            // TODO log warning
//                        }
                        scope._resizeElement();
                    });
            } else {
                this._resizeElement();
            }

            this.on("resize", function () {
                scope._resizeElement();
            });
        }
        TextWidget.prototype = Object.create(SlidingWidget.prototype);

        TextWidget.prototype._resizeElement = function () {
            // There's no way to scale some text to fit in a box with CSS.
            // But we can keep increasing the font size until the element is wider than the window.
            var size = 6;
            while (this.element.width() < this.element.parent().width() && size < 10000) {
                this.setFontSize(++size);
            }
            this.setFontSize(size - 1);
        };

        TextWidget.prototype.setFontSize = function (size) {
            this.element.css({"font-size": size + "px"});
        };

        return TextWidget;
    });