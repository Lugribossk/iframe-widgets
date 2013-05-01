require.config({
    paths: {
        jquery: "http://code.jquery.com/jquery-2.0.0.min",
        webfont: "http://ajax.googleapis.com/ajax/libs/webfont/1/webfont",
        //iframeapi: "http://api.viewer.zmags.com/widgets/iframe"
        iframeapi: "http://cdn-api-viewer-a.eu.zmags.com/widgets/iframe"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        }
    }
});