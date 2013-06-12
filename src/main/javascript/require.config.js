require.config({
    paths: {
        // Libraries
        requirejs: "lib/requirejs/require",
        jquery: "lib/jquery/jquery",
        underscore: "lib/underscore/underscore",
        Handlebars: "lib/handlebars/handlebars",

        backbone: "lib/backbone/backbone",
        "backbone.stickit": "lib/backbone.stickit/backbone.stickit",
        marionette: "lib/backbone.marionette/lib/backbone.marionette",

        bootstrap: "lib/bootstrap/docs/assets/js/bootstrap",
        "bootstrap-colorpicker": "lib/bootstrap-colorpicker/js/bootstrap-colorpicker",
        "jquery.animate-enhanced": "lib/jquery.animate-enhanced/scripts/src/jquery.animate-enhanced",

        // External APIs
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe",
        addthis: "//s7.addthis.com/js/300/addthis_widget",

        // RequireJS plugins
        text: "lib/requirejs-text/text",
        hbars: "lib/requirejs-handlebars/hbars"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        },
        addthis: {
            exports: "addthis"
        },
        bootstrap: {
            deps: ["jquery",
                   "css!lib/bootstrap/docs/assets/css/bootstrap",
                   "css!lib/font-awesome/build/assets/font-awesome/css/font-awesome"]
        },
        "bootstrap-colorpicker": {
            deps: ["bootstrap",
                   "css!lib/bootstrap-colorpicker/css/bootstrap-colorpicker"]
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
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        "jquery.animate-enhanced": {
            deps: ["jquery"]
        },
        "backbone.stickit": {
            deps: ["backbone"]
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