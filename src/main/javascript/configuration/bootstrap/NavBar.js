define(["jquery", "marionette", "hbars!template/NavBar", "bootstrap"],
    function ($, Marionette, NavBar) {
        "use strict";

        /**
         * Bootstrap navbar view.
         *
         * @author Bo Gotthardt
         */
        return Marionette.ItemView.extend({
            template: NavBar,
            ui: {
                navItems: "ul.nav li"
            },
            events: {
                "click ul.nav a": function (e) {
                    var target = $(e.currentTarget);

                    if (!target.hasClass("active")) {
                        this.ui.navItems.removeClass("active");
                        target.parent().addClass("active");

                        this.trigger("change", target.data("event"));
                    }

                    e.preventDefault();
                }
            }
        });
    });