/*global window*/
define(["jquery", "widget/AnimatedWidget", "util/WebFontLoader", "util/Logger", "util/Promise"],
    function ($, AnimatedWidget, WebFontLoader, Logger, Promise) {
        "use strict";
        var log = new Logger("TextWidget");

        /**
         * Widget for displaying text.
         * Automatically sized to match the widow size.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object} options
         */
        function TextWidget(options) {
            AnimatedWidget.call(this, options);

            var scope = this;

            ["font-family", "color", "text-shadow", "opacity", "letter-spacing", "line-height"].forEach(function (property) {
                if (scope.options[property]) {
                    scope.element.css(property, scope.options[property]);
                }
            });

            var text = this.options.text.replace("\n", "<br/>");
            this.element.html(text)
                .addClass("TextWidget");

            var clazz = this.options["class"];
            if (clazz) {
                this.element.addClass(clazz);
            }

            this.on("resize", function () {
                scope._matchTextSizeToWindow();
            });

            this._loadFonts().then(this.initialized.resolve, this.initialized.reject);
        }
        TextWidget.prototype = Object.create(AnimatedWidget.prototype);

        /**
         * Load any external fonts required.
         *
         * @returns {Promise} A promise for all the fonts having loaded.
         * @private
         */
        TextWidget.prototype._loadFonts = function () {
            var scope = this,
                waitingOnFonts = [];

            if (this.options.googleFont) {
                var fontName = this.options["font-family"];
                if (fontName) {
                    waitingOnFonts.push(WebFontLoader.loadGoogle(fontName));
                } else {
                    log.warn("Google Fonts has been enabled, but the font familiy to load has not been specified.");
                }
            }

            if (this.options.fontAwesome) {
                waitingOnFonts.push(WebFontLoader.loadFontAwesome());
            }

            if (this.options.typekitId) {
                waitingOnFonts.push(WebFontLoader.loadTypekit(this.options.typekitId));
            }

            return Promise.all(waitingOnFonts)
                .then(function () {
                    scope._matchTextSizeToWindow();
                });
        };

        /**
         * Resize the text so it fills the window.
         * @private
         */
        TextWidget.prototype._matchTextSizeToWindow = function () {
            var win = $(window);
            // There's no way to scale some text to fit in a box with CSS.
            // But we can keep increasing the font size until the element is larger than the window.
            var size = 6;
            do {
                this.setFontSize(++size);
            } while (this.element.width() < win.width() &&
                    this.element.height() < win.height() &&
                    size < 10000);
            this.setFontSize(size - 1);
        };

        /**
         * Set the font size, as a number of pixels.
         * @param {Number} size
         */
        TextWidget.prototype.setFontSize = function (size) {
            this.element.css({"font-size": size + "px"});
        };

        return TextWidget;
    });