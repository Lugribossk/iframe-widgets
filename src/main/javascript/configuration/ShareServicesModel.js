/*global window*/
define(["jquery", "backbone"],
    function ($, Backbone) {
        "use strict";

        /**
         * A list of sharing services retrieved from the AddThis API.
         *
         * @author Bo Gotthardt
         */
        return Backbone.Model.extend({
            defaults: {
                services: [],
                formattedServices: new $.Deferred()
            },

            initialize: function () {
                // AddThis uses a quite clever hash fragment-based JSONP callback scheme for their API.
                // Unfortunately this is too clever for jQuery's ajax methods so we have to manually create the callback function and insert the script tag.
                var scope = this,
                    callbackName = "addthis_" + new Date().getTime();

                window[callbackName] = function (response) {
                    var results = response.data.map(function (item) {
                        return {
                            id: item.code,
                            text: item.name
                        };
                    });

                    var formatted = [{
                        text: "Popular",
                        children: [{
                            id: "facebook",
                            text: "Facebook"
                        }, {
                            id: "twitter",
                            text: "Twitter"
                        }]
                    }, {
                        text: "All",
                        children: results
                    }];

                    scope.set("services", response.data);
                    scope.get("formattedServices").resolve(formatted);
                };

                // The AddThis API code has a bug where it doesn't match the first parameter in the hash fragment, so put the parameter we need as number two.
                // It also doesn't recognize the script tag unless it uses an http URL.
                $("<script src='http://cache.addthiscdn.com/services/v1/sharing.en.jsonp?#x=y&jsonpcallback=" + callbackName + "'></script>")
                    .appendTo("head");
            }
        });
    });