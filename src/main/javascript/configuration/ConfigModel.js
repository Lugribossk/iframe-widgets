define(["backbone", "util/UrlParameters"],
    function (Backbone, UrlParameters) {
        "use strict";

        /**
         * Widget configuration parameters model.
         *
         * @author Bo Gotthardt
         */
        return Backbone.Model.extend({
            defaults: {
                url: null,
                parameters: null,
                baseUrl: null
            },

            /**
             * Set the configuration parameters.
             *
             * Use this instead of set("parameters")!
             *
             * @param {Object} parameters
             */
            setParameters: function (parameters) {
                this.set({
                    parameters: parameters,
                    url: this.get("baseUrl") + UrlParameters.prototype.toHashFragment.call(parameters)
                });
            }
        });
    });