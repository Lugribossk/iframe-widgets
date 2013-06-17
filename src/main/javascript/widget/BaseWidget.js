/*global window*/
define(["jquery", "lib/lucid", "iframeapi", "css!styling/widget"],
    function ($, LucidJS, Iframe) {
        "use strict";

        var $window = $(window);

        function fixIframeSize() {
            // Force the html element to keep its initial size, regardless of what content we insert later on.
            // This fixes an iOS 6 issue where the iframe will grow to adjust to its content.
            $("html").height($window.height())
                     .width($window.width());
        }

        /**
         * Generic base functionality for widgets.
         *
         * @event activate When the widget is potentially visible to the user.
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

            fixIframeSize();

            this.element = $("<div class='BaseWidget'></div>")
                .appendTo("body");

            /**
             * Whether the widget is currently active.
             * @type {Boolean}
             */
            this.active = false;

            /**
             * A promise for the widget having finished initializing.
             * Subclasses must resolve this when they are done initializing.
             * @type {$.Deferred}
             */
            this.initialized = new $.Deferred();

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_ACTIVATE, function (event) {
                scope.activate(event.publicationID, event.currentPages, event.widgetPages);
            });

            Iframe.addEventListener(Iframe.IFRAME_WIDGET_DEACTIVATE, function (event) {
                scope.deactivate(event.publicationID, event.currentPages, event.widgetPages);
            });

            $window.on("resize", function () {
                // Hide the widget element so it doesn't influence the size of the iframe, set the html size to match
                // the new iframe size, and show the element again.
                scope.element.hide();
                fixIframeSize();
                scope.element.show();

                scope.trigger("resize");
            });

            $window.on("beforeunload", function () {
                scope.trigger("unload");
            });
        }

        // Mix-in event handling functionality.
        LucidJS.emitter(BaseWidget.prototype);

        /**
         * Activate the widget. Is called automatically by the Iframe API.
         */
        BaseWidget.prototype.activate = function (publicationID, currentPages, widgetPages) {
            this.active = true;
            this.trigger("activate", publicationID, currentPages, widgetPages);
        };

        /**
         * Deactivate the widget. Is called automatically by the Iframe API.
         */
        BaseWidget.prototype.deactivate = function (publicationID, currentPages, widgetPages) {
            this.active = false;
            this.trigger("deactivate", publicationID, currentPages, widgetPages);
        };

        /**
         * Make the widget visible.
         */
        BaseWidget.prototype.show = function () {
            this.element.toggleClass("hidden", false);
        };

        /**
         * Hide the widget.
         */
        BaseWidget.prototype.hide = function () {
            this.element.toggleClass("hidden", true);
        };

        return BaseWidget;
    });