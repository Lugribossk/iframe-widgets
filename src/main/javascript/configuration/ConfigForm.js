/*global window*/
define(["jquery", "marionette", "hbars!template/TextConfigForm",
    "hbars!template/ImageConfigForm",
    "hbars!template/ShareConfigForm", "hbars!template/AnimationConfigForm", "util/Logger", "bootstrap-colorpicker"],
    function ($, Marionette, TextConfigForm, ImageConfigForm, ShareConfigForm, AnimationConfigForm, Logger) {
        "use strict";
        var log = new Logger("ConfigForm");

        var TYPING_DELAY_MS = 500;

        /**
         * Generic configuration form view.
         *
         * Must be instantiated with the configuration type and ConfigModel to use.
         *
         * @author Bo Gotthardt
         */
        return Marionette.Layout.extend({
            getTemplate: function () {
                switch (this.options.type) {
                case "text":
                    return TextConfigForm;
                case "image":
                    return ImageConfigForm;
                case "share":
                    return ShareConfigForm;
                default:
                    log.error("Unknown config type: ", this.options.type);
                    return null;
                }
            },
            ui: {
                formInputs: "input, select, textarea",
                colorpickers: "input.colorpicker"
            },
            regions: {
                animation: "#animation"
            },
            events: {
                "change input[type='checkbox'], select": "updateModel",
                "keyup input, textarea": "updateModel",
                "changeColor .colorpicker": "updateModel",
                "keyup input[data-validate-https]": function (e) {
                    var target = $(e.currentTarget);
                    $(target.data("validate-https")).toggle(target.val().indexOf("http://") === 0);
                }
            },

            onRender: function () {
                this.animation.show(new Marionette.ItemView({
                    template: AnimationConfigForm
                }));

                // Re-bind so this.ui also includes elements from the animation form.
                this.bindUIElements();

                // Activate colorpicker plugin.
                this.ui.colorpickers.colorpicker();
            },

            close: function () {
                // The colorpicker must be explicitly removed.
                this.ui.colorpickers.colorpicker("destroy");
            },

            /**
             * Update the model to reflect the current state of the form.
             * Only triggers after a pause between form updates so that typing does not spam updates.
             */
            updateModel: function () {
                var scope = this;
                window.clearTimeout(this.dataTimeout);

                this.dataTimeout = window.setTimeout(function () {
                    var parameters = {},
                        requiredMissing = false;

                    function addParameter(element) {
                        var name = element.data("parameter"),
                            value = element.val();

                        if (element.data("append")) {
                            value = value + element.data("append");
                        }

                        if (parameters[name] !== undefined) {
                            if ($.isArray(parameters[name])) {
                                parameters[name].push(value);
                            } else {
                                parameters[name] = [parameters[name], value];
                            }
                        } else {
                            parameters[name] = value;
                        }
                    }

                    scope.ui.formInputs.each(function (i, element) {
                        var e = $(element);

                        if (e.prop("type") === "checkbox") {
                            if (e.prop("checked")) {
                                addParameter(e);
                            }
                        } else {
                            if (e.val() !== "") {
                                addParameter(e);
                            } else if (e.data("required") !== undefined) {
                                requiredMissing = true;
                            }
                        }
                    });

                    if (!requiredMissing) {
                        scope.model.setParameters(parameters);
                    }
                }, TYPING_DELAY_MS);
            }
        });
    });