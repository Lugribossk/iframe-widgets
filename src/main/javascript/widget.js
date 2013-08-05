/*global window*/
require(["jquery", "widget/WidgetBuilder", "util/UrlParameters"],
    function ($, WidgetBuilder, UrlParameters) {
        "use strict";

        var widgetBuilder = new WidgetBuilder(window.presets),
            hashParameters = new UrlParameters.fromHash();

        // If there are hash parameters, then build the widget based on them.
        if (Object.keys(hashParameters).length > 0) {
            widgetBuilder.build(hashParameters);
        }

        // If the hash changes later on, replace the widget with a new one.
        $(window).on("hashchange", function () {
            $(".BaseWidget").remove();
            widgetBuilder.build(new UrlParameters.fromHash());
        });
    });