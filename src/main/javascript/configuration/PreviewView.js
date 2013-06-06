define(["marionette", "hbars!template/PreviewView"],
    function (Marionette, PreviewView) {
        "use strict";

        return Marionette.ItemView.extend({
            template: PreviewView
        });
    });