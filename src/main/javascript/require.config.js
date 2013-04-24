/**
 * RequireJS module setup.
 */
var require = {
    paths: {
        jquery: "http://code.jquery.com/jquery-1.9.1.min",
        webfont: "http://ajax.googleapis.com/ajax/libs/webfont/1/webfont"
    },
    shim: {
        webfont: {
            exports: "WebFont"
        }
    }
};