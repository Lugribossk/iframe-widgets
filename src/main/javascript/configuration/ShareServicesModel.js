/*global window*/
define(["jquery", "backbone"],
    function ($, Backbone) {
        "use strict";

        return Backbone.Model.extend({
            defaults: {
                results: [],
                loaded: new $.Deferred()
            },

            initialize: function () {
                // AddThis uses a quite clever hash fragment-based JSONP callback scheme for their API.
                // Unfortunately this is too clever for jQuery's ajax methods so we have to do it manually.

                var scope = this;
                window.blarh = function (response) {
                    var results = response.data.map(function (item) {
                        return {
                            id: item.code,
                            text: item.name
                        };
                    });

                    scope.set("results", [{
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
                    }]);

                    scope.get("loaded").resolve();
                };

                // Insert the JSONP script tag.
                // The AddThis API code has a bug where it doesn't match the first parameter in the hash fragment, so put the parameter we need as number two.
                $("<script src='http://cache.addthiscdn.com/services/v1/sharing.en.jsonp?#x=y&jsonpcallback=blarh'></script>")
                    .appendTo("body");
            }
        });
    });