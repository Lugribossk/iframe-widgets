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
        function BaseWidget(options) {
            var scope = this;
            this.options = options;

            this.element = $("<div></div>")
                .appendTo("body");

            /**
             * Whether the widget is currently activated.
             * @type {Boolean}
             */
            this.activated = false;

            /**
             * A promise for the widget having finished initializing.
             * Subclasses must resolve this when they are done initializing.
             * @type {$.Deferred}
             */
            this.initialized = new $.Deferred();

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_ACTIVATE, function (event) {
                scope.activate(event);
            });

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_DEACTIVATE, function (event) {
                scope.deactivate(event);
            });

            $(window).on("resize", function () {
                scope.trigger("resize");
            });

            $(window).on("beforeunload", function () {
                scope.trigger("unload");
            });
        }

        // Mix-in event handling functionality.
        LucidJS.emitter(BaseWidget.prototype);

        /**
         * Activate the widget. Is called automatically by the Iframe API.
         * @param event
         */
        BaseWidget.prototype.activate = function (event) {
            this.activated = true;
            this.trigger("activate", event);
        };

        /**
         * Deactivate the widget. Is called automatically by the Iframe API.
         * @param event
         */
        BaseWidget.prototype.deactivate = function (event) {
            this.activated = false;
            this.trigger("deactivate", event);
        };

        /**
         * Make the widget visible.
         */
        BaseWidget.prototype.show = function () {
            // Use visibility rather than display so that the widget retains its size while hidden.
            this.element.css("visibility", "visible");
        };

        /**
         * Hide the widget.
         */
        BaseWidget.prototype.hide = function () {
            this.element.css("visibility", "hidden");
        };

        return BaseWidget;
    });