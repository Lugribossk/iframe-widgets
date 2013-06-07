/*global window*/
define(["marionette",
    "template/Helpers",
    "bootstrap",
    "css!styling/configure",
    "configuration/bootstrap/NavBar",
    "configuration/ConfigForm",
    "hbars!template/TextConfigForm",
    "hbars!template/ImageConfigForm",
    "hbars!template/ShareConfigForm",
    "configuration/WidgetPreview",
    "configuration/ConfigModel"],
    function (Marionette, helpers, bootstrap, css, NavBar, ConfigForm, TextConfigForm, ImageConfigForm, ShareConfigForm, WidgetPreview, ConfigModel) {
        "use strict";

        var app = new Marionette.Application(),
            templates = {
                text: TextConfigForm,
                image: ImageConfigForm,
                share: ShareConfigForm
            };

        function showConfigView(template, model) {
            app.config.show(new ConfigForm({
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
            app.preview.show(new WidgetPreview({model: configModel}));
            showConfigView(TextConfigForm, configModel);

            navBar.on("change", function (active) {
                showConfigView(templates[active], configModel);
            });
        });

        return app;
    });