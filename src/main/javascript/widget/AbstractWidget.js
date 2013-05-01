/*global window*/
define(["jquery", "util/QueryParameters", "lib/lucid", "iframeapi"],
    function ($, QueryParameters, LucidJS, Iframe) {
        "use strict";

        /**
         * Generic base functionality for widgets.
         *
         * @event activate When the widget is visible to the user.
         * @event deactivate When the widget is no longer visible to the user.
         * @event resize When the window is resized.
         * @event unload When the window is about to be destroyed.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Object} options
         */
        function AbstractWidget(options) {
            var scope = this;
            this.options = options;

            this.element = $("<div></div>")
                .appendTo("body");

            this.activated = false;

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_ACTIVATE, function () {
                scope.trigger.apply(this, ["activate"].concat(Array.prototype.slice.call(arguments, 1)));
            });

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_DEACTIVATE, function () {
                scope.trigger.apply(this, ["deactivate"].concat(Array.prototype.slice.call(arguments, 1)));
            });

            this.on("activated", function () {
                scope.activated = true;
            });

            this.on("deactivated", function () {
                scope.activated = false;
            });

            $(window).on("resize", function () {
                scope.trigger("resize");
            });

            $(window).on("beforeunload", function () {
                scope.trigger("unload");
            });
        }

        // Mix-in event handling functionality.
        LucidJS.emitter(AbstractWidget.prototype);

        /**
         * Make the widget visible.
         */
        AbstractWidget.prototype.show = function () {
            // Use visibility rather than display so that the widget retains its size while hidden.
            this.element.css("visibility", "visible");
        };

        /**
         * Hide the widget.
         */
        AbstractWidget.prototype.hide = function () {
            this.element.css("visibility", "hidden");
        };

        return AbstractWidget;
    });