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
            serializeData: function () {
                return this.options;
            },
            onRender: function () {
                this.options.items.forEach(function (item) {
                    if (item.region && item.view) {
                        this[item.region].show(item.view);
                    }
                }, this);
            },
            activeLink: function (link) {
                this.ui.navItems.removeClass("active");
                this.ui.navItems.find("a[href='#" + link + "']").parent().addClass("active");
            }
        });
    });