define(["jquery", "widget/BaseWidget"],
    function ($, BaseWidget) {
        "use strict";

        function showMessage(text) {
            var now = new Date(),
                time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();

            $("<div class='message'>[" + time + "] " + text + "</div>")
                .appendTo("body");
        }

        function DebugWidget(options) {
            BaseWidget.call(this, options);

            $("body").css("background-color", "lightblue");

            showMessage("Created");

            this.on("activate", function () {
                showMessage("Activated");
            });

            this.on("deactivate", function () {
                showMessage("Dectivated");
            });

            this.initialized.resolve();
        }
        DebugWidget.prototype = Object.create(BaseWidget.prototype);

        return DebugWidget;
    });