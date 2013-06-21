/*global window*/
define(["marionette",
    "backbone",
    "template/Helpers",
    "bootstrap",
    "css!styling/configure",
    "configuration/bootstrap/NavBar",
    "configuration/ConfigForm",
    "configuration/WidgetPreview",
    "configuration/ConfigModel"],
    function (Marionette, Backbone, helpers, bootstrap, css, NavBar, ConfigForm, WidgetPreview, ConfigModel) {
        "use strict";

        /**
         * "Widgetizer" application for configuring HTML5 iframe widgets, so that they are easy to plug into Enriched.
         *
         * @author Bo Gotthardt
         */
        var app = new Marionette.Application();

        app.addRegions({
            navbar: "#navbar",
            config: "#config",
            preview: "#preview"
        });

        app.addInitializer(function () {
            var configModel = new ConfigModel();

            app.navbar.show(new NavBar({
                brand: "Widgetizer",
                items: [{
                    title: "Text",
                    link: "#text",
                    active: true
                }, {
                    title: "Image/SVG",
                    link: "#image"
                }, {
                    title: "Share",
                    link: "#share"
                }]
            }));
            app.preview.show(new WidgetPreview({model: configModel}));

            var router = new Backbone.Router({
                routes: {
                    ":type": function (type) {
                        app.config.show(new ConfigForm({
                            type: type,
                            model: configModel
                        }));
                        app.navbar.currentView.activeLink(type);
                        configModel.set("parameters", {});
                    },
                    "": function () {
                        window.location.hash = "#text";
                    }
                }
            });
            Backbone.history.start();
        });

        return app;
    });