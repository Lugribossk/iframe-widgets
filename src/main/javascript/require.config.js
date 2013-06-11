require.config({
    paths: {
        // Libraries
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        Handlebars: "lib/handlebars",

        backbone: "lib/backbone/backbone",
        "backbone.wreqr": "lib/backbone/backbone.wreqr",
        "backbone.babysitter": "lib/backbone/backbone.babysitter",
        "backbone.stickit": "lib/backbone/backbone.stickit",
        marionette: "lib/backbone/backbone.marionette",

        bootstrap: "lib/bootstrap/bootstrap",
        "bootstrap-colorpicker": "lib/bootstrap/bootstrap-colorpicker",

        // External APIs
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe",
        addthis: "//s7.addthis.com/js/300/addthis_widget",

        // RequireJS plugins
        text: "lib/plugins/text",
        hbars: "lib/plugins/hbars"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        },
        addthis: {
            exports: "addthis"
        },
        bootstrap: {
            deps: ["jquery", "css!styling/lib/bootstrap", "css!styling/lib/font-awesome"]
        },
        "bootstrap-colorpicker": {
            deps: ["bootstrap", "css!styling/lib/bootstrap-colorpicker"]
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
        },
        "lib/jquery.animate-enhanced": {
            deps: ["jquery"]
        },
        "backbone.stickit": {
            deps: ["backbone"]
        }
    },
    map: {
        "*": {
            "css": "lib/plugins/require-css/css"
        }
    },
    hbars: {
        extension: ".hbs"
    }
});