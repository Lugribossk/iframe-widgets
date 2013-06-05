require.config({
    paths: {
        jquery: "lib/jquery",
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe"
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
        }
    },
    map: {
        "*": {
            "css": "lib/require-css/css"
        }
    }
});