/*global window*/
require(["widget/WidgetBuilder"],
    function (WidgetBuilder) {
        "use strict";

        new WidgetBuilder(window.presets).fromQueryParameters()
            .done(function (widget) {
                window.setTimeout(function () {
                    widget.trigger("activate");
                }, 500);
            });
    });