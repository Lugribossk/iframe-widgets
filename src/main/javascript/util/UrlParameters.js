/*global window*/
define([],
    function () {
        "use strict";

        function join(scope, prefix) {
            var keys = Object.keys(scope);

            if (keys.length === 0) {
                return "";
            }

            return prefix + keys.map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(scope[key]);
            }).join("&");
        }

        /**
         * Query or hash fragment parameter parsing.
         * The parameters are placed directly as properties on the object.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {String} parameterString The parameters to parse.
         */
        function UrlParameters(parameterString) {
            var scope = this;

            if (parameterString !== "") {
                var parameters = parameterString.substr(1).split("&");
                parameters.forEach(function (parameter) {
                    var keyValue = parameter.split("=");
                    if (keyValue.length === 2) {
                        scope[keyValue[0]] = decodeURIComponent(keyValue[1]);
                    } else {
                        scope[keyValue[0]] = "";
                    }
                });
            }
        }

        /**
         * Create from query parameters.
         *
         * @param {Window} [frame] The window to parse query parameters for. Optional, defaults to the current frame.
         * @returns {UrlParameters}
         */
        UrlParameters.fromQuery = function (frame) {
            frame = frame || window;
            return new UrlParameters(frame.location.search);
        };

        /**
         * Create from hash fragment parameters.
         *
         * @param {Window} [frame] The window to parse hash fragment parameters for. Optional, defaults to the current frame.
         * @returns {UrlParameters}
         */
        UrlParameters.fromHash = function (frame) {
            frame = frame || window;
            return new UrlParameters(frame.location.hash);
        };

        /**
         * Returns the parameters as a query string, including the leading ? if applicable.
         *
         * @returns {String}
         */
        UrlParameters.prototype.toQueryString = function () {
            return join(this, "?");
        };

        /**
         * Returns the parameters as a hash fragment, including the leading # if applicable.
         *
         * @returns {String}
         */
        UrlParameters.prototype.toHashFragment = function () {
            return join(this, "#");
        };

        return UrlParameters;
    });