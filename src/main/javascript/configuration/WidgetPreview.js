/*global window*/
define(["jquery", "marionette", "hbars!template/WidgetPreview", "backbone.stickit"],
    function ($, Marionette, WidgetPreview) {
        "use strict";

        var ENRICHED_MAX_LENGTH = 255;

        /**
         * Preview pane view with widget iframe and URL display.
         *
         * @author Bo Gotthardt
         */
        return Marionette.ItemView.extend({
            template: WidgetPreview,
            events: {
                "click .select-on-click": function (e) {
                    $(e.currentTarget).select();
                },
                "click #refresh": function () {
                    // Re-apply data bindings, causing the iframe src to get a new timestamp and thus triggering a hashchange.
                    this.stickit();
                }
            },
            bindings: {
                "#newwindow": {attributes: [{observe: "url", name: "href"}]},
                "#url": {attributes: [{observe: "url", name: "value"}]},
                "iframe": {attributes: [{observe: "activateUrl", name: "src"}]},
                "#warning-length": {
                    observe: "url",
                    updateView: false,
                    visible: function (url) {
                        return url.length > ENRICHED_MAX_LENGTH;
                    }
                }
            },
            onRender: function () {
                this.stickit();
            }
        });
    });