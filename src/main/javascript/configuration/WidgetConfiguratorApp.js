define(["marionette",
    "template/Helpers",
    "lib/bootstrap",
    "css!styling/configure",
    "configuration/bootstrap/NavBar",
    "configuration/ConfigView",
    "hbars!template/TextConfigView",
    "hbars!template/ImageConfigView",
    "hbars!template/ShareConfigView",
    "configuration/PreviewView"],
    function (Marionette, helpers, bootstrap, css, NavBar, ConfigView, TextConfigView, ImageConfigView, ShareConfigView, PreviewView) {
        "use strict";

        var app = new Marionette.Application(),
            templates = {
                text: TextConfigView,
                image: ImageConfigView,
                share: ShareConfigView
            };

        app.addRegions({
            navbar: "#navbar",
            config: "#config",
            preview: "#preview"
        });

        function blah(template) {
            app.config.show(new ConfigView({
                template: template
            }));
        }

        app.addInitializer(function () {
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
            blah(TextConfigView);
            app.preview.show(new PreviewView());

            navBar.on("change", function (active) {
                blah(templates[active]);
            });
        });

        return app;
    });