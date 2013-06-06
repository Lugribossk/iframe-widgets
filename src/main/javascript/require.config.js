require.config({
    paths: {
        // Libraries
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        Handlebars: "lib/handlebars",
        backbone: "lib/backbone/backbone",
        "backbone.wreqr": "lib/backbone/backbone.wreqr",
        "backbone.babysitter": "lib/backbone/backbone.babysitter",
        marionette: "lib/backbone/backbone.marionette",

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
        underscore: {
            exports: "_"
        },
        Handlebars: {
            exports: "Handlebars"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
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