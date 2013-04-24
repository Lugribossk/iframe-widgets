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

        return WebFontLoader;
    });