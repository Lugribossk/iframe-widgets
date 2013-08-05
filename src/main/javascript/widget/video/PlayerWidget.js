define(["widget/BaseWidget", "util/UrlParameters"],
    function (BaseWidget) {
        "use strict";

        function PlayerWidget() {
            BaseWidget.call(this);
        }
        PlayerWidget.prototype = Object.create(BaseWidget.prototype);

        return PlayerWidget;
    });