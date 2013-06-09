define(["jquery", "marionette", "hbars!template/NavBar", "bootstrap"],
    function ($, Marionette, NavBar) {
        "use strict";

        /**
         * Bootstrap navbar view.
         *
         * @author Bo Gotthardt
         */
        return Marionette.Layout.extend({
            template: NavBar,
            ui: {
                navItems: "ul.nav li"
            },
            regions: function (options) {
                var regions = {};

                options.items.forEach(function (item, index) {
                    if (item.region) {
                        regions[item.region] = ".region-" + index;
                    }
                });

                return regions;
            },
            events: {
                "click ul.nav a": function (e) {
                    var target = $(e.currentTarget);

                    if (!target.hasClass("active")) {
                        this.ui.navItems.removeClass("active");
                        target.parent().addClass("active");
                    }
                }
            },
            serializeData: function () {
                return this.options;
            },
            onRender: function () {
                this.options.items.forEach(function (item) {
                    if (item.region && item.view) {
                        this[item.region].show(item.view);
                    }
                }, this);
            }
        });
    });