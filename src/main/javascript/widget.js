/*global window*/
require(["jquery", "widget/WidgetBuilder", "util/QueryParameters"],
    function ($, WidgetBuilder, QueryParameters) {
        "use strict";

        var widgetBuilder = new WidgetBuilder(window.presets),
            queryParameters = new QueryParameters();

        if (Object.keys(queryParameters).length > 0) {
            // If there are query parameters, then build the widget based on them.
            widgetBuilder.build(queryParameters);
        } else {
            var widgetPromise;
            // Else wait to be controlled by the widget configurator via postMessage().
            $(window).on("message", function (e) {
                var data = JSON.parse(e.originalEvent.data);

                if (data.widgetCommand === "parameters") {
                    $(".BaseWidget").remove();
                    widgetPromise = widgetBuilder.build(data.parameters);
                    widgetPromise.done(function (widget) {
                        widget.activate();
                    });
                }
                if (data.widgetCommand === "activate" && widgetPromise) {
                    widgetPromise.done(function (widget) {
                        widget.activate();
                    });
                }
            });
        }
    });