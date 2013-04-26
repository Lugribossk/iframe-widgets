define(["widget/AbstractWidget", "util/QueryParameters"],
    function (AbstractWidget) {
        "use strict";

        function PlayerWidget() {
            AbstractWidget.call(this);
        }
        PlayerWidget.prototype = Object.create(AbstractWidget.prototype);

        return PlayerWidget;
    });