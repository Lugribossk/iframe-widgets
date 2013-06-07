/*global window*/
define(["marionette",
    "template/Helpers",
    "lib/bootstrap",
    "css!styling/configure",
    "configuration/bootstrap/NavBar",
    "configuration/ConfigView",
    "hbars!template/TextConfigView",
    "hbars!template/ImageConfigView",
    "hbars!template/ShareConfigView",
    "configuration/PreviewView",
    "configuration/ConfigModel"],
    function (Marionette, helpers, bootstrap, css, NavBar, ConfigView, TextConfigView, ImageConfigView, ShareConfigView, PreviewView, ConfigModel) {
        "use strict";

        var app = new Marionette.Application(),
            templates = {
                text: TextConfigView,
                image: ImageConfigView,
                share: ShareConfigView
            };

        function showConfigView(template, model) {
            app.config.show(new ConfigView({
                template: template,
                model: model
            }));
        }

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
            });

            app.navbar.show(navBar);
            app.preview.show(new PreviewView({model: configModel}));
            showConfigView(TextConfigView, configModel);

            navBar.on("change", function (active) {
                showConfigView(templates[active], configModel);
            });
        });

        return app;
    });