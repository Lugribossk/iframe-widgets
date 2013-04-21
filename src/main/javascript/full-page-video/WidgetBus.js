/*global window*/
var WidgetBus = (function () {
    "use strict";

    function WidgetBus() {
        this.playerWidgets = {};
        this.callbacks = {};
    }

    WidgetBus.prototype.unregisterPlayerWidget = function (id) {
        delete this.playerWidgets[id];
    };

    WidgetBus.prototype.offPlayerWidgetReady = function (id) {
        delete this.callbacks[id];
    };

    WidgetBus.prototype.registerPlayerWidget = function (id, ytPlayerFactory) {
        if (this.callbacks[id]) {
            this.callbacks[id](ytPlayerFactory);
            this.offPlayerWidgetReady(id);
        } else {
            this.playerWidgets[id] = ytPlayerFactory;
        }
    };

    WidgetBus.prototype.onPlayerWidgetReady = function (id, callback) {
        if (this.playerWidgets[id]) {
            callback(this.playerWidgets[id]);
            this.unregisterPlayerWidget(id);
        } else {
            this.callbacks[id] = callback;
        }
    };

    WidgetBus.initialize = function () {
        if (window.parent && window.parent.parent) {
            var frame = window.parent.parent;

            if (!frame.widgetBus) {
                frame.widgetBus = new WidgetBus();
            }

            return frame.widgetBus;
        }

        throw new Error("This widget only works for embedded publications.");
    };
    return WidgetBus;
}());