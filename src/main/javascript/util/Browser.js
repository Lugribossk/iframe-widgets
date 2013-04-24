/*global window*/
define([],
    function () {
        "use strict";

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

        return Browser;
    });