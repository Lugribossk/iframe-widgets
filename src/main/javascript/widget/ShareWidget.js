/*global window*/
define(["jquery", "widget/AnimatedWidget", "addthis"],
    function ($, AnimatedWidget, AddThis) {
        "use strict";

        /**
         * Widget for social sharing via AddThis.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param options
         */
        function ShareWidget(options) {
            AnimatedWidget.call(this, options);

            this.element.addClass("ShareWidget addthis_toolbox addthis_default_style");

            var smallIcons = ($(window).height() <= 16);

            this.options.services.split(",").forEach(function (service) {
                this.element.append("<a class='addthis_button_" + service + "'>" +
                    // We create the images ourselves so that we can easily scale them. the ones inserted automatically by AddThis are background images on nested elements.
                    // Use the small icons if the widget is small enough.
                    "<img src='//cache.addthiscdn.com/icons/v1/thumbs/" + (smallIcons ? "" : "32x32/") + service + (smallIcons ? ".gif" : ".png") + "'/>" +
                    "</a>");
            }, this);

            var scope = this;
            this.on("activate", function (publicationID, currentPages, widgetPages) {
                if (!scope.sharingInitialized) {
                    // Wait with initializing the sharing until the first activate event so we can get the publication ID.
                    AddThis.toolbox(".ShareWidget", {}, {
                        url: scope.getShareUrl(publicationID, widgetPages && widgetPages.firstPage),
                        title: scope.options.title
                    });
                    scope.sharingInitialized = true;
                }
            });

            this.initialized.resolve();
        }
        ShareWidget.prototype = Object.create(AnimatedWidget.prototype);

        ShareWidget.prototype.getShareUrl = function (publicationID, widgetPage) {
            var url = this.options.url,
                deeplink = !this.options.noDeeplink;
            if (url) {
                if (deeplink) {
                    if (url.indexOf("?") !== -1) {
                        return url + "&page=" + widgetPage;
                    } else {
                        return url + "?page=" + widgetPage;
                    }
                } else {
                    return url;
                }
            }

            return "http://viewer.zmags.com/publication/" + publicationID + (deeplink ? ("?page=" + widgetPage) : "");
        };

        return ShareWidget;
    });