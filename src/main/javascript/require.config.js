require.config({
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        webfont: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        //iframeapi: "//secure.api.viewer.zmags.com/widgets/iframe"
        iframeapi: "//cdn-secure-api-viewer-a.eu.zmags.com/widgets/iframe"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        }
    }
});