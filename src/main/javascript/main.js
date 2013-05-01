/*global window*/
require(["widget/WidgetBuilder"],
    function (WidgetBuilder) {
        "use strict";

        new WidgetBuilder(window.presets).fromQueryParameters()
            .done(function (widget) {
                window.widget = widget;
            });
    });