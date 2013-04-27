define(["jquery", "webfont"],
    function ($, WebFont) {
        "use strict";

        function load(config) {
            var deferred = new $.Deferred();

            config.active = function () {
                deferred.resolve();
            };
            config.inactive = function () {
                deferred.reject();
            };

            WebFont.load(config);

            return deferred.promise();
        }


        /**
         * Utility class for loading web fonts.
         *
         * @author Bo Gotthardt
         *
         * @constructor
         */
        function WebFontLoader() {
        }

        WebFontLoader.loadGoogle = function () {
            return load({
                google: {
                    families: arguments
                }
            });
        };

        WebFontLoader.loadTypekit = function (id) {
            return load({
                typekit: {
                    id: id
                }
            });
        };

        WebFontLoader.loadFontAwesome = function () {
            var deferred = new $.Deferred();

            $("<link href='//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css' rel='stylesheet'>")
                .on("load", function () {
                    deferred.resolve();
                })
                .appendTo("head");

            return deferred;
        };

        return WebFontLoader;
    });