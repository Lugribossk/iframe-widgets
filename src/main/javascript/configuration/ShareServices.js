define(["jquery", "marionette", "hbars!template/ShareServices", "lib/select2", "css!styling/lib/select2", "lib/jquery-ui-1.10.3.custom"],
    function ($, Marionette, ShareServices) {
        "use strict";
        // Should depend on http://cache.addthiscdn.com/icons/v1/sprites/services.css, but the CSS plugin build doesn't work with external URLs.

        return Marionette.ItemView.extend({
            template: ShareServices,
            ui: {
                shareServices: "#shareServices",
                dragHelp: "#reorder-help"
            },
            events: {
                "change #shareServices": function () {
                    this.ui.dragHelp.toggle(this.ui.shareServices.val() !== "");
                }
            },

            onRender: function () {
                var scope = this;

                this.model.get("loaded").done(function () {
                    scope.ui.shareServices.select2({
                        // Set tags to force it into that mode
                        tags: [],
                        formatSelection: function (obj, container) {
                            container.append("<img src='//cache.addthiscdn.com/icons/v1/thumbs/32x32/" + obj.id + ".png'/>");
                        },
                        formatResult: function (obj, container) {
                            if (obj.id) {
                                container.append("<span class='shareIcon addthis_service_icon icon_" + obj.id + "'/><span class='shareIconText'>" + obj.text + "</span>");
                            } else {
                                return obj.text;
                            }
                        },
                        data: {
                            results: scope.model.get("results")
                        }
                    });

                    // Enable drag-and-drop.
                    scope.ui.shareServices.select2("container").find("ul.select2-choices").sortable({
                        containment: "parent",
                        start: function () {
                            scope.ui.shareServices.select2("onSortStart");
                        },
                        update: function () {
                            scope.ui.shareServices.select2("onSortEnd");
                        }
                    });
                });
            },

            clear: function () {
                this.ui.shareServices.select2("val", "");
            }
        });
    });