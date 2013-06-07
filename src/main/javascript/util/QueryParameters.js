/*global window*/
define([],
    function () {
        "use strict";

        /**
         * Query parameter parsing.
         * The parameters are placed directly as properties on the object.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Window} [frame] The window to parse query parameters for. Optional, defaults to the current frame.
         */
        function QueryParameters(frame) {
            frame = frame || window;
            var scope = this,
                queryString = frame.location.search;

            if (queryString !== "") {
                var parameters = queryString.substr(1).split("&");
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
         * Returns the query parameters as a string, including the leading ? if applicable.
         * If the parameters happen to have a "toQueryString" key, you need to use QueryParameters.prototype.toQueryString.call(x) instead.
         *
         * @returns {String}
         */
        QueryParameters.prototype.toQueryString = function () {
            var scope = this,
                keys = Object.keys(this);

            if (keys.length === 0) {
                return "";
            }

            return "?" + keys.map(function (key) {
                return key + "=" + scope[key];
            }).join("&");
        };

        return QueryParameters;
    });