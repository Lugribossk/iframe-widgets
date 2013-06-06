/*global window */
define(["jquery", "template/Helpers", "hbars!template/configure", "lib/bootstrap", "lib/bootstrap-colorpicker", "css!styling/configure"],
    function ($, Helpers, template) {
        "use strict";

        /**
         * A simple UI for visually creating widget configuration query strings.
         * Unfortunately an excellent example of how quickly a purely jQuery-based UI degenerates into ugliness...
         *
         * @author Bo Gotthardt
         * @constructor
         */
        function WidgetConfigurator() {}

        var BASE_URL = window.location.href.replace(/http:/, "").replace(/\/configure/, "/widget"),
            TYPING_DELAY = 500,
            ENRICHED_MAX_LENGTH = 255;

        var widgetType,
            form,
            iframe,
            update;

        function updateType() {
            $(".widget-config").hide();
            $(".widget-config-" + widgetType.val()).show();
        }

        function updateUrl() {
            window.clearTimeout(update);

            update = window.setTimeout(function () {
                var parameters = {},
                    requiredMissing = false;

                $("#widget-type, .widget-config-" + widgetType.val()).find("input, select, textarea").each(function (i, element) {
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
                    var url = BASE_URL + "?" + $.map(parameters, function (a, b) {
                        if ($.isArray(a)) {
                            a = a.join(",");
                        }
                        return b + "=" + encodeURIComponent(a);
                    }).join("&");

                    $("#newwindow").prop("href", url);
                    $("#url").val(url);

                    $("#warning-length").toggle(url.length > ENRICHED_MAX_LENGTH);

                    var preset = {};

                    Object.keys(parameters).forEach(function (parameter) {
                        var v = parameters[parameter];
                        if ($.isArray(v)) {
                            v = v.join(",");
                        }
                        preset[parameter] = v;
                    });

                    $("#preset").val(JSON.stringify(preset));

                    window.frames[0].postMessage(JSON.stringify({
                        widgetCommand: "parameters",
                        parameters: preset
                    }), "*");

                }
            }, TYPING_DELAY);
        }

        /**
         * Initialize the configuration UI.
         *
         * @static
         */
        WidgetConfigurator.init = function () {
            $("<div></div>").html(template()).appendTo("body");

            widgetType = $("#widget-type").find("select");
            form = $("#form");
            iframe = $("#preview-frame");

            form.find("input, textarea").on("keyup", updateUrl);
            form.find("input[type='checkbox'], select").on("change", updateUrl);

            $("#refresh").on("click", function () {
                window.frames[0].postMessage(JSON.stringify({
                    widgetCommand: "activate"
                }), "*");
            });

            $(".select-on-click").on("click", function () {
                this.select();
            });

            widgetType.on("change", updateType);

            updateType();

            $("#preview-frame").prop("src", BASE_URL);

            $(".colorpicker").colorpicker().on("changeColor", updateUrl);
        };

        return WidgetConfigurator;
    });