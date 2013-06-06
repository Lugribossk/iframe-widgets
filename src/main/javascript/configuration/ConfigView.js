/*global window*/
define(["jquery", "marionette", "hbars!template/AnimationConfigView", "lib/bootstrap-colorpicker"/*, "configuration/EventBus"*/],
    function ($, Marionette, AnimationConfigView, EventBus) {
        "use strict";

        var TYPING_DELAY = 500;

        function getData() {
            /*jshint validthis:true */
            var scope = this;
            window.clearTimeout(this.dataTimeout);

            this.dataTimeout = window.setTimeout(function () {
                var parameters = {},
                    requiredMissing = false;

                scope.ui.formInputs.each(function (i, element) {
                    var e = $(element);

                    if (e.prop("type") === "checkbox") {
                        if (e.prop("checked")) {
                            if (parameters[e.data("parameter")] !== undefined) {
                                parameters[e.data("parameter")].push(e.val());
                            } else {
                                parameters[e.data("parameter")] = [e.val()];
                            }
                        }
                    } else {
                        if (e.val() !== "") {
                            var value = e.val();

                            if (e.data("append")) {
                                value = value + e.data("append");
                            }

                            parameters[e.data("parameter")] = value;
                        } else if (e.data("required") !== undefined) {
                            requiredMissing = true;
                        }
                    }
                });

                if (!requiredMissing) {
                    console.log(parameters);
                    //EventBus.trigger("change:config", parameters);
                }
            }, TYPING_DELAY);
        }

        return Marionette.Layout.extend({
            ui: {
                formInputs: "input, select, textarea"
            },
            regions: {
                animation: "#animation"
            },
            events: {
                "change input[type='checkbox'], select": getData,
                "keyup input, textarea": getData
            },
            onRender: function () {
                this.animation.show(new Marionette.ItemView({
                    template: AnimationConfigView
                }));

                // TODO
                //$(".colorpicker").colorpicker().on("changeColor", getData);

                // Re-bind so formInput also includes the animation form inputs.
                this.bindUIElements();
            }
        });
    });