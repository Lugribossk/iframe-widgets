/*global window*/
define(["backbone", "util/UrlParameters", "configuration/ShareServicesModel"],
    function (Backbone, UrlParameters, ShareServicesModel) {
        "use strict";

        /**
         * Widget configuration parameters model.
         *
         * @author Bo Gotthardt
         */
        return Backbone.Model.extend({
            defaults: {
                url: "",
                activateUrl: "",
                parameters: {},
                baseUrl: "//" + window.location.host + window.location.pathname.replace(/\/configure/g, "/widget"),

                shareServices: new ShareServicesModel()
            },

            initialize: function () {
                // This seems to be the only way to create computed properties...
                this.on("change:parameters", this.updateComputedProperties);
                this.updateComputedProperties();
            },

            updateComputedProperties: function () {
                this.set("url", this.get("baseUrl") + UrlParameters.prototype.toHashFragment.call(this.get("parameters")));

                if (Object.keys(this.get("parameters")).length > 0) {
                    this.set("activateUrl", this.get("url") + "&activate=true&" + new Date().getTime());
                } else {
                    this.set("activateUrl", this.get("baseUrl"));
                }
            }
        });
    });