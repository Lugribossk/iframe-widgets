/*global window*/
define(["jquery", "util/Logger"],
    function ($, Logger) {
        "use strict";
        var log = new Logger("Browser");

        function isTransitionsSupported() {
            var thisBody = window.document.body || window.document.documentElement,
                thisStyle = thisBody.style;
            return thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined || thisStyle.transition !== undefined;
        }

        var transitionsSupported = isTransitionsSupported();

        /**
         * Utility class for getting the window object.
         * This makes unit testing easier and avoids having to add it as an allowed global variable.
         *
         * @author Bo Gotthardt
         * @constructor
         */
        function Browser() {}

        /**
         * Get the window object.
         *
         * @static
         *
         * @return {Window}
         */
        Browser.getWindow = function () {
            return window;
        };

        /**
         * Whether the current page is loaded over HTTPS.
         *
         * @static
         *
         * @return {Boolean}
         */
        Browser.isSecure = function () {
            return window.location.protocol === "https:";
        };

        Browser.isTransitionsSupported = function () {
            return transitionsSupported;
        };

        return Browser;
    });