define(["jquery", "widget/AbstractWidget"],
    function ($, AbstractWidget) {
        "use strict";

        function showMessage(text) {
            var now = new Date(),
                time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();

            $("<div class='message'>[" + time + "] " + text + "</div>")
                .appendTo("body");
        }

        function DebugWidget(options) {
            AbstractWidget.call(this, options);

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
        DebugWidget.prototype = Object.create(AbstractWidget.prototype);

        return DebugWidget;
    });