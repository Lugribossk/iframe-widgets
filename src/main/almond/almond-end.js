    // Fake jQuery module that returns the definition from the real module, or the global variable.
    // This seems to be the only way to have the code depend on jQuery without bundling it.
    define("jquery", [], function () {
        if (jQuery) {
            return jQuery;
        }

        // Hopefully only jQuery will have a "support" property on the global $ variable.
        if (window.$ && window.$.support) {
            return window.$;
        }

        throw new Error("PublicationAPI could not find jQuery. It must be defined as a module or included in a script tag before this.");
    });

    return require("api/PublicationAPI");
}));