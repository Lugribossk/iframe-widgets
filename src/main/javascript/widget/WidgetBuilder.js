/*global window*/
define(["jquery", "util/QueryParameters", "util/Logger", "util/Promise"],
    function ($, QueryParameters, Logger, Promise) {
        "use strict";
        var log = new Logger("WidgetBuilder");

        function getWidgetConstructor(type) {
            var widgetClass;

            switch (type) {
            case "text":
                widgetClass = "widget/TextWidget";
                break;
            case "image":
                widgetClass = "widget/ImageWidget";
                break;
//            case "debug":
//                widgetClass = "widget/DebugWidget";
//                break;
//            case "cardflip":
//                widgetClass = "widget/CardFlipWidget";
//                break;
            // If adding a new class here, also add it to the Gruntfile under requirejs.compile.options.deps .
            default:
                log.error("Unknown widget type:", type);
                return Promise.rejected();
            }

            // Dynamically require the widget class needed.
            // Doing this rather that defining a static dependency on all the widgets means we can avoid loading all
            // external dependencies for all widgets immediately, even if they are never needed.
            var deferred = new $.Deferred();

            require([widgetClass], function (Widget) {
                deferred.resolve(Widget);
            });

            return deferred;
        }

        /**
         * Builder that can create the various different kinds of widgets based on the options provided.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object} [presets] A map of preset names to their options.
         */
        function WidgetBuilder(presets) {
            this.presets = presets;
        }

        /**
         * Create a widget based on the options in the page's query parameters.
         *
         * @returns {Promise} A promise for the widget
         */
        WidgetBuilder.prototype.fromQueryParameters = function () {
            var parameters = new QueryParameters();
            var options = {};

            if (parameters.preset) {
                if (this.presets && this.presets[parameters.preset]) {
                    options = this.presets[parameters.preset];
                } else {
                    log.warn("Preset not found:", parameters.preset);
                }
            }

            Object.keys(parameters).forEach(function (parameter) {
                options[parameter] = parameters[parameter];
            });

            return getWidgetConstructor(options.type)
                .then(function (Widget) {
                    var widget = new Widget(options);

                    // If the page has been opened directly we will never get the activate event, so trigger it manually.
                    if (window === window.top || parameters.activate) {
                        widget.initialized.done(function () {
                            log.info("Widget loaded directly, activating immediately.");
                            widget.activate();
                        });
                    }

                    return widget;
                });
        };

        return WidgetBuilder;
    });