define(["jquery",
        "underscore",
        "marionette",
        "hbars!template/TextConfigForm",
        "hbars!template/ImageConfigForm",
        "hbars!template/ShareConfigForm",
        "hbars!template/AnimationConfigForm",
        "util/Logger",
        "configuration/ShareServicesDropdown",
        "bootstrap-colorpicker"],
    function ($, _, Marionette, TextConfigForm, ImageConfigForm, ShareConfigForm, AnimationConfigForm, Logger, ShareServicesDropdown) {
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
                    return TextConfigForm;
                }
            },
            ui: {
                formInputs: "input, select, textarea",
                colorpickers: "input.colorpicker",

                noValOnClear: "input[type='text'], input[type='number'], input[type='url'], select",
                uncheckOnClear: "input[type='checkbox']"
            },
            regions: {
                animation: "#animation",
                shareServices: "#shareServices"
            },
            events: {
                "change input[type='checkbox'], input[type='hidden'], select": "updateModel",
                "changeColor .colorpicker": "updateModel",
                "keyup input, textarea": _.debounce(function () {
                    this.updateModel();
                }, TYPING_DELAY_MS),
                "keyup input[data-validate-https]": function (e) {
                    var target = $(e.currentTarget);
                    $(target.data("validate-https")).toggle(target.val().indexOf("http://") === 0);
                },
                "click #clear": function () {
                    this.ui.noValOnClear.val("");
                    this.ui.uncheckOnClear.removeAttr("checked");
                    this.shareServices.currentView.clear();
                    this.model.set("parameters", {});
                }
            },

            onRender: function () {
                this.animation.show(new Marionette.ItemView({
                    template: AnimationConfigForm
                }));

                this.shareServices.show(new ShareServicesDropdown({
                    model: this.model.get("shareServices")
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
             */
            updateModel: function () {
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

                this.ui.formInputs.each(function (i, element) {
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
                    this.model.set("parameters", parameters);
                }
            }
        });
    });