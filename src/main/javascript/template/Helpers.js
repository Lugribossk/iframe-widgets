define(["Handlebars", "util/Logger"],
    function (Handlebars, Logger) {
        "use strict";
        var log = new Logger("Handlebars");

        /**
         * Font Awesome icons.
         * See http://fortawesome.github.io/Font-Awesome/
         *
         * E.g. {{icon "flag"}} or {{icon "flag" "4x" "muted"}}
         */
        Handlebars.registerHelper("icon", function (type) {
            var cssClass = "",
                i;

            // Skip the last argument.
            for (i = 0; i < arguments.length - 1; i++) {
                cssClass = cssClass + " icon-" + arguments[i];
            }

            return new Handlebars.SafeString("<i class='" + cssClass + "'></i> ");
        });

        /**
         * Trigger debugger breakpoint.
         */
        Handlebars.registerHelper("debugger", function () {
            /*jshint debug:true*/
            debugger;
        });

        return Handlebars;
    });