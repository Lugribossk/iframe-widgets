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

        var app = new Marionette.Application();

        app.addRegions({
            navbar: "#navbar",
            config: "#config",
            preview: "#preview"
        });

        app.addInitializer(function () {
            var configModel = new ConfigModel({
                baseUrl: window.location.href.replace(/http:/, "").replace(/\/configure/, "/widget")
            });

            var navBar = new NavBar({
                model: new Backbone.Model({
                    brand: "Widget Configurator",
                    items: [
                        {
                            title: "Text",
                            event: "text",
                            active: true
                        },
                        {
                            title: "Image/SVG",
                            event: "image"
                        },
                        {
                            title: "Share",
                            event: "share"
                        }
                    ]
                })
            });

            app.navbar.show(navBar);
            app.preview.show(new WidgetPreview({model: configModel}));
            app.config.show(new ConfigForm({
                type: "text",
                model: configModel
            }));

            navBar.on("change", function (active) {
                app.config.show(new ConfigForm({
                    type: active,
                    model: configModel
                }));
            });
        });

        return app;
    });