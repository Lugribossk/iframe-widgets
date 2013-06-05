require.config({
    paths: {
        // Libraries
        jquery: "lib/jquery",
        Handlebars: "lib/handlebars",

        // External APIs
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe",

        // RequireJS plugins
        text: "lib/text",
        hbars: "lib/hbars"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        },
        "lib/bootstrap": {
            deps: ["jquery", "css!styling/lib/bootstrap", "css!styling/lib/font-awesome"]
        },
        "lib/bootstrap-colorpicker": {
            deps: ["lib/bootstrap", "css!styling/lib/bootstrap-colorpicker"]
        },
        Handlebars: {
            exports: "Handlebars"
        }
    },
    map: {
        "*": {
            "css": "lib/require-css/css"
        }
    },
    hbars: {
        extension: ".hbs"
    }
});