/*global window*/
define(["jquery"],
    function ($) {
        "use strict";

        function findCSSPrefix() {
            var style = window.getComputedStyle($("body")[0], null);

            if (style.WebkitTransition) {
                return "-webkit-";
            }
            if (style.MozTransition) {
                return "-moz-";
            }
            if (style.msTransition) {
                return "-ms-";
            }
            if (style.OTransition) {
                return "-o-";
            }
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

        Browser.getCSSPrefix = function () {
            return prefix;
        };

        return Browser;
    });