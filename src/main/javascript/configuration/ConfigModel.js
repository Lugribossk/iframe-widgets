define(["backbone", "util/QueryParameters"],
    function (Backbone, QueryParameters) {
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
                    url: this.get("baseUrl") + QueryParameters.prototype.toQueryString.call(parameters)
                });
            }
        });
    });