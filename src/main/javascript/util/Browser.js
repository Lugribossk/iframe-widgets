/*global window*/
define(["jquery", "util/Logger"],
    function ($, Logger) {
        "use strict";
        var log = new Logger("Browser");

        function findCSSPrefix() {
            var style = window.getComputedStyle($("body")[0], null);

            if (style.WebkitTransition !== undefined) {
                return "-webkit-";
            }
            if (style.MozTransition !== undefined) {
                return "-moz-";
            }
            if (style.msTransition !== undefined) {
                return "-ms-";
            }
            if (style.OTransition !== undefined) {
                return "-o-";
            }
            log.error("Unable to determine browser CSS prefix.");
            return "";
        }

        var prefix = findCSSPrefix();

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

        /**
         * Get the CSS vendor prefix used by this browser.
         *
         * @static
         *
         * @return {String}
         */
        Browser.getCSSPrefix = function () {
            return prefix;
        };

        return Browser;
    });