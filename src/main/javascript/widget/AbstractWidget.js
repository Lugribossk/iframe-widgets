/*global window*/
define(["jquery", "util/QueryParameters", "lib/lucid"/*, "iframeapi"*/],
    function ($, QueryParameters, LucidJS, Iframe) {
        "use strict";

        /**
         * Generic base functionality for widgets.
         *
         * @event activate When the widget is visible to the user.
         * @event deactivate When the widget is no longer visible to the user.
         * @event resize When the window is resized.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object|QueryParameters} [parameters]
         * @param {Object} [presets]
         */
        function AbstractWidget(parameters, presets) {
            var scope = this;
            this.parameters = parameters || new QueryParameters();

            if (this.parameters.preset && presets) {
                this.parameters = presets[this.parameters.preset];
            }

            this.element = $("<div></div>")
                .appendTo("body");

            this.activated = false;


            /*Iframe.addEventListener(Iframe.IFRAME_WIDGET_ACTIVATE, function () {
                this.activated = true;
                this.trigger.apply(this, ["activate"].concat(Array.prototype.slice.call(arguments, 1)));
            });

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_DEACTIVATE, function () {
                this.activated = false;
                this.trigger.apply(this, ["deactivate"].concat(Array.prototype.slice.call(arguments, 1)));
            });*/

            $(window).on("resize", function () {
                scope.trigger("resize");
            });
        }

        // Mix-in event handling functionality.
        LucidJS.emitter(AbstractWidget.prototype);

        AbstractWidget.prototype.show = function () {
            this.element.css("visibility", "visible");
        };

        AbstractWidget.prototype.hide = function () {
            this.element.css("visibility", "hidden");
        };

        return AbstractWidget;
    });