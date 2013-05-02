define(["jquery", "widget/AbstractWidget"],
    function ($, AbstractWidget) {
        "use strict";

        function CardFlipWidget(options) {
            AbstractWidget.call(this, options);
            this.element.addClass("CardFlipWidget");

            var card = $("<div class='card'></div>")
                .appendTo(this.element);

            var front = $("<div class='side front'></div>")
                .appendTo(card);
            var back = $("<div class='side back'></div>")
                .appendTo(card);

            $("<img src='widget_" + this.options.productId + ".jpg'/>").appendTo(front);

            var scope = this;
            $.get("widget_" + this.options.productId + ".html")
                .done(function (data) {
                    back.html(data);
                    back.find(".flip").on("click", function () {
                        scope.flip();
                    });
                });

            front.on("click", function () {
                scope.flip();
            });

            this.on("deactivate", function () {
                scope.flipToFront();
            });

        }
        CardFlipWidget.prototype = Object.create(AbstractWidget.prototype);

        CardFlipWidget.prototype.flip = function () {
            this.element.toggleClass("flipped");
        };

        CardFlipWidget.prototype.flipToFront = function () {
            this.element.removeClass("flipped");
        };

        return CardFlipWidget;
    });