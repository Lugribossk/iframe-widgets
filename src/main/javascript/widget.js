/*global require*/
require(["WidgetCollection"],
    function (WidgetCollection) {
        "use strict";
        var presets = {
            test1: {
                type: "text",
                text: "Text Widget",
                "font-family": "Dancing Script",
                from: "top"
            },
            test2: {
                type: "text",
                text: "Text Widget",
                "font-family": "Droid Sans",
                from: "right",
                // http://www.midwinter-dg.com/permalink-7-great-css-based-text-effects-using-the-text-shadow-property_2011-03-03.html
                "text-shadow": "0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135",
                color: "#fff"
            },
            test3: {
                type: "image",
                src: "http://zmags.com/wp-content/themes/zmags/images/map.png",
                from: "right"
            }
        };

        new WidgetCollection().fromQueryParameters(presets)
            .done(function (widget) {
                setTimeout(function () {
                    widget.trigger("activate");
                }, 500);
            });
    });