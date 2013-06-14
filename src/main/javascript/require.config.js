require.config({
    paths: {
        // Libraries
        requirejs: "../../../components/requirejs/require",
        jquery: "../../../components/jquery/jquery",
        underscore: "../../../components/underscore/underscore",
        Handlebars: "../../../components/handlebars/handlebars",

        backbone: "../../../components/backbone/backbone",
        "backbone.stickit": "../../../components/backbone.stickit/backbone.stickit",
        marionette: "../../../components/backbone.marionette/lib/backbone.marionette",

        bootstrap: "../../../components/bootstrap/docs/assets/js/bootstrap",
        "bootstrap-colorpicker": "../../../components/bootstrap-colorpicker/js/bootstrap-colorpicker",

        "jquery.animate-enhanced": "../../../components/jquery.animate-enhanced/scripts/src/jquery.animate-enhanced",

        // External APIs
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe",
        addthis: "//s7.addthis.com/js/300/addthis_widget",

        // RequireJS plugins
        text: "../../../components/requirejs-text/text",
        hbars: "../../../components/requirejs-handlebars/hbars",
        css: "../../../components/require-css/css",
        "normalize": "../../../components/require-css/normalize",
        "css-builder": "../../../components/require-css/css-builder"
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
                   "css!../../../components/bootstrap/docs/assets/css/bootstrap",
                   "css!../../../components/font-awesome/build/assets/font-awesome/css/font-awesome"]
        },
        "bootstrap-colorpicker": {
            deps: ["bootstrap",
                   "css!../../../components/bootstrap-colorpicker/css/bootstrap-colorpicker"]
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
    hbars: {
        extension: ".hbs"
    }
});