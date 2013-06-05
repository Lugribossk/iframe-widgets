/*global window*/
require(["jquery", "widget/WidgetBuilder"],
    function ($, WidgetBuilder) {
        "use strict";

        new WidgetBuilder(window.presets).fromQueryParameters()
            .done(function (widget) {
                window.widget = widget;
            });

//        $(window).on("message", function (e) {
//            var data = JSON.parse(e.originalEvent.data);
//            debugger
//        });

    });