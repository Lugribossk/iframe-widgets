(function (root, factory) {
    // Almond code wrapper, modified from https://github.com/jrburke/almond#exporting-a-public-api
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        root.PublicationAPI = factory(null);
    }
}(this, function (jQuery) {
