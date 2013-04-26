/*global require*/
define(["jquery", "util/QueryParameters"],
    function ($, QueryParameters) {
        "use strict";

        function getWidgetConstructor(type) {
            var x;
            switch (type) {
            case "text":
                x = "widget/TextWidget";
                break;
            case "image":
                x = "widget/ImageWidget";
                break;
            // If adding a new class here, also add it to the Gruntfile under requirejs.compile.options.deps .
            }

            // Dynamically require the widget class needed.
            // Doing this rather that defining a static dependency on all the classes avoid loading all
            // of their external dependencies immediately, even if they are never needed.
            var deferred = new $.Deferred();
            require([x], function (Widget) {
                deferred.resolve(Widget);
            });

            return deferred;
        }

        function WidgetCollection() {
        }

        WidgetCollection.prototype.fromQueryParameters = function (presets) {
            var parameters = new QueryParameters();
            var options = {};

            if (presets && parameters.preset && presets[parameters.preset]) {
                options = presets[parameters.preset];
            }

            $.extend(options, parameters);

            return getWidgetConstructor(options.type)
                .then(function (Widget) {
                    return new Widget(options);
                });
        };

        return WidgetCollection;
    });