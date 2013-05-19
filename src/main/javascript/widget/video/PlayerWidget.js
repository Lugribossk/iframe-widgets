define(["widget/BaseWidget", "util/QueryParameters"],
    function (BaseWidget) {
        "use strict";

        function PlayerWidget() {
            BaseWidget.call(this);
        }
        PlayerWidget.prototype = Object.create(BaseWidget.prototype);

        return PlayerWidget;
    });