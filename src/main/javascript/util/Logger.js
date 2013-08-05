/*global window*/
define(["util/Promise"],
    function (Promise) {
        "use strict";

        var output;

        // Create a dummy console for IE.
        if (window.console !== undefined) {
            output = window.console;
        } else {
            output = {
                info: function () {},
                warn: function () {},
                error: function () {}
            };
        }

        /**
         * A simple instantiable logger.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {String} name The logger name.
         */
        function Logger(name) {
            this._name = name;
        }

        /**
         * Use the specified console function name to print the list of data.
         *
         * @private
         *
         * @param {String} functionName
         * @param {Arguments/ *[]} dataList
         */
        Logger.prototype._callPrintFunction = function (functionName, dataList) {
            var messages = ["[" + this._name + "]"].concat(Array.prototype.slice.call(dataList));

            // IE doesn't inherit the logging functions from Function. This also means that ES5-shim's bind() doesn't work on it.
            if (typeof output[functionName] !== "function") {
                output[functionName](messages.join(" "));
            } else {
                // Chrome requires the console as it's own context.
                output[functionName].apply(output, messages);
            }
        };

        /**
         * Print the list of data to the console.
         * If there is only one argument and it is a Promise, it's resolved value will be logged instead.
         *
         * @private
         *
         * @param {String} functionName
         * @param {Arguments} dataList
         */
        Logger.prototype._print = function (functionName, dataList) {
            var scope = this;
            if (Promise.isPromise(dataList[0]) && dataList.length === 1) {
                dataList[0]
                    .done(function () {
                        scope._callPrintFunction(functionName, arguments);
                    })
                    .fail(function () {
                        scope._callPrintFunction(functionName, ["Promise failed."]);
                    });
            } else {
                scope._callPrintFunction(functionName, dataList);
            }
        };

        /**
         * Log informational message.
         */
        Logger.prototype.info = function () {
            this._print("info", arguments);
        };

        /**
         * Log warning about undesired behavior.
         */
        Logger.prototype.warn = function () {
            this._print("warn", arguments);
        };

        /**
         * Log error message.
         */
        Logger.prototype.error = function () {
            this._print("error", arguments);
        };

        /**
         * Assert that the specified condition is true. If it is not, any additional arguments will be logged as an
         * error and the browser debugger will be triggered.
         *
         * @param {*} condition The condition to check
         */
        Logger.prototype.assert = function (condition) {
            if (!condition) {
                this.error.apply(this, Array.prototype.slice.call(arguments, 1));
                // This debugger statement is allowed to stay in as it's part of the assert functionality.
                /*jshint debug:true*/
                debugger;
            }
        };

        return Logger;
    });