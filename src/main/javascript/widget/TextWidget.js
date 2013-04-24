/*global setTimeout*/
define(["jquery", "widget/AbstractWidget", "util/QueryParameters", "util/WebFontLoader", "util/Browser"],
    function ($, AbstractWidget, QueryParameters, WebFontLoader) {
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
            AbstractWidget.call(this);

            parameters = parameters || new QueryParameters();
            if (parameters.preset) {
                parameters = presets[parameters.preset];
            }

            var scope = this,
                fontName = parameters["font-family"];
            if (fontName) {
                WebFontLoader.loadGoogle(fontName)
                    .done(function () {
                        scope._createElement(parameters);
                    });
            } else {
                this._createElement(parameters);
            }
        }
        TextWidget.prototype = Object.create(AbstractWidget.prototype);

        TextWidget.prototype._createElement = function (parameters) {
            var fontCss = {};
            ["font-family", "color", "text-shadow", "opacity", "letter-spacing"].forEach(function (property) {
                if (parameters[property]) {
                    fontCss[property] = parameters[property];
                }
            });

            var text = parameters.text.replace("\n", "<br/>");
            this.element = $("<span class='text-widget'>" + parameters.text + "</div>")
                .css(fontCss)
                .appendTo("body");

            var clazz = parameters["class"];
            if (clazz) {
                this.element.addClass(clazz);
            }

            // There's no way to scale some text to fit in a box with CSS, so keep making the font size bigger until it's wider than the window.
            var size = 6;
            while (this.element.width() < this.element.parent().width()) {
                this.setFontSize(++size);
            }
            this.setFontSize(size - 1);

            this._directionCss(parameters);

            // TODO signal done loading?
        };

        TextWidget.prototype._directionCss = function (parameters) {
            var from = parameters.from;
            if (!from) {
                return;
            }

            var position = {},
                animation = {};

            if (from === "top") {
                position.top = -this.element.height() + "px";
                animation.transform = "translate3d(0, " + this.element.height() + "px, 0)";
            } else if (from === "bottom") {
                position.top = this.element.height() + "px";
                animation.transform = "translate3d(0, -" + this.element.height() + "px, 0)";
            } else if (from === "left") {
                position.right = this.element.width() + "px";
                animation.transform = "translate3d(" + this.element.width() + "px, 0, 0)";
            } else if (from === "right") {
                position.left = this.element.width() + "px";
                animation.transform = "translate3d(-" + this.element.width() + "px, 0, 0)";
            }

            this.element.css({
                position: "absolute",
                "transition-duration": parameters["transition-duration"] || "1s",
                "transition-timing-function": parameters["transition-timing-function"] || "ease",
                "transition-delay": parameters["transition-delay"] || 0
            });

            this.element.css(position);

            // TODO on event from API
            var scope = this;
            setTimeout(function () {
                scope.element.css(animation);
            }, 0);
        };

        TextWidget.prototype.setFontSize = function (size) {
            this.element.css({"font-size": size + "px"});
        };

        return TextWidget;
    });