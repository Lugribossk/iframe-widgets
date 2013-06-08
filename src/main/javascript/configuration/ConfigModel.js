/*global window*/
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
                // If only the url could be a computed property solely derived form the two others...
                url: "",
                parameters: {},
                baseUrl: "//" + window.location.host + window.location.pathname.replace(/\/configure/, "/widget")
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