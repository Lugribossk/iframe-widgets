define(["Handlebars", "util/Logger"],
    function (Handlebars, Logger) {
        "use strict";
        var log = new Logger("Handlebars");

        // Override Handlebars' logger with our own.
        Handlebars.logger.log = function (level, obj) {
            if (level === Handlebars.logger.DEBUG ||
                level === Handlebars.logger.INFO) {
                log.info(obj);
            } else if (level === Handlebars.logger.WARN) {
                log.warn(obj);
            } else if (level === Handlebars.logger.ERROR) {
                log.error(obj);
            }
        };

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

        /**
         * Use the value of a resolved or rejected Promise.
         */
        Handlebars.registerHelper("promise", function (resolvedPromise) {
            log.assert(resolvedPromise.state() !== "pending", "Input promise is still pending.");

            var value = "";
            resolvedPromise.always(function (v) {
                value = v;
            });

            return new Handlebars.SafeString(value);
        });

        return Handlebars;
    });