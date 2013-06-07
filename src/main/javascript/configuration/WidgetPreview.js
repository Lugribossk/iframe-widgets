/*global window*/
define(["jquery", "marionette", "hbars!template/WidgetPreview"],
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
            ui: {
                newWindow: "#newwindow",
                refresh: "#refresh",
                url: "#url",
                lengthWarning: "#warning-length",
                iframe: "#preview-frame"
            },
            events: {
                "click .select-on-click": function (e) {
                    $(e.currentTarget).select();
                },
                "click #refresh": "onRefreshButtonClick"
            },
            onRender: function () {
                this.listenTo(this.model, "change", this.onUrlChange);
                this.ui.iframe.prop("src", this.model.get("baseUrl"));
            },

            onUrlChange: function () {
                var url = this.model.get("url");

                this.ui.newWindow.prop("href", url);
                this.ui.url.val(url);
                this.ui.lengthWarning.toggle(url.length > ENRICHED_MAX_LENGTH);

                // Activate the widget immediately.
                this.ui.iframe.prop("src", url + "&activate=true");
            },

            onRefreshButtonClick: function () {
                // Activate immediately, with an extra random parameter to force a hashchange event.
                this.ui.iframe.prop("src", this.model.get("url") + "&activate=true&" + new Date().getTime());
            }
        });
    });