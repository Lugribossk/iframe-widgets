define(["jquery"],
    function ($) {
        "use strict";

        /**
         * Utility class for Promises/Deferreds. Also defines the Promise class to stop IntelliJ warning about it not being found.
         *
         * The actual Promise/Deferred class is from jQuery, see <a href="http://api.jquery.com/category/deferred-object/">jQuery Deferred documentation</a>.
         *
         * @author Bo Gotthardt
         * @constructor
         */
        function Promise() {}

        /**
         * See <a href="http://api.jquery.com/deferred.then/">deferred.then()</a>.
         *
         * @param {Function} doneFilter
         * @param {Function} [failFilter]
         * @param {Function} [progressFilter]
         */
        Promise.prototype.then = function (doneFilter, failFilter, progressFilter) {};
        /**
         * See <a href="http://api.jquery.com/deferred.done/">deferred.done()</a>.
         *
         * @param {Function} callback
         */
        Promise.prototype.done = function (callback) {};
        /**
         * See <a href="http://api.jquery.com/deferred.fail/">deferred.fail()</a>.
         *
         * @param {Function} callback
         */
        Promise.prototype.fail = function (callback) {};
        /**
         * See <a href="http://api.jquery.com/deferred.progress/">deferred.progress()</a>.
         *
         * @param {Function} callback
         */
        Promise.prototype.progress = function (callback) {};

        // TODO Fix these to work with any number of arguments.
        // There seems to be a problem with new $.Deferred().reject.apply() returning window.
        /**
         * Create a rejected promise.
         *
         * @static
         *
         * @param {*} [arg]
         * @return {Promise}
         */
        Promise.rejected = function (arg) {
            return new $.Deferred().reject(arg).promise();
        };

        /**
         * Create a resolved promise.
         *
         * @static
         *
         * @param {*} [arg]
         * @return {Promise}
         */
        Promise.resolved = function (arg) {
            return new $.Deferred().resolve(arg).promise();
        };


        function notification(subordinates, combinedDeferred) {
            var numDone = 0;

            subordinates.forEach(function (subordinate) {
                // The subordinates can be both promises and already computed synchronous values.
                // This is the same check as in $.when().
                if (Promise.isPromise(subordinate)) {
                    subordinate.done(function (arg) {
                        numDone++;
                        combinedDeferred.notify.call(this, arg, numDone / subordinates.length);
                    });
                } else {
                    numDone++;
                    combinedDeferred.notify.call(this, subordinate, numDone / subordinates.length);
                }
            });
        }

        /**
         * An improved version of $.when() that returns the values as a single list.
         *
         * Also progresses when individual subordinates are done. The progress event will have the resolved Promise's
         * value and the percentage of subordinates that are done as parameters.
         *
         * Note that due to the way progress() behaves, this function has a rather subtle gotcha when one or more of
         * the subordinates are done already (i.e. non-Promises or already resolved Promises).
         * These will then trigger the progress events <b>synchronously</b> while inside this function call. And unlike
         * done() and fail(), progress() handlers attached later are not called with previously triggered events.
         * So it is therefore not guaranteed how many progress events the caller will actually get, unless they create
         * their own deferred, set up a progress handler and only then pass it as the combinedDeferred parameter.
         *
         * @static
         *
         * @param {*[]} subordinates The list of subordinates, either Promises or arbitrary values.
         * @param {Deferred} [combinedDeferred] The "combined" deferred (not Promise) to use, instead of creating it internally.
         * @return {Promise} A promise for the list of the values of all the subordinates.
         *                   The promise interface of combinedDeferred if that was passed.
         */
        Promise.all = function (subordinates, combinedDeferred) {
            // We would like the returned promise to progress whenever an individual promise has resolved, but $.when() does not support that.
            // So we have to create our own deferred that can be resolved by $.when(), and progressed by done() from the individual promises.
            combinedDeferred = combinedDeferred || new $.Deferred();
            var numDone = 0;

            subordinates.forEach(function (subordinate) {
                // The subordinates can be both promises and already computed synchronous values.
                // This is the same check as in $.when().
                if (Promise.isPromise(subordinate)) {
                    subordinate.done(function (arg) {
                        numDone++;
                        combinedDeferred.notify.call(this, arg, numDone / subordinates.length);
                    });
                } else {
                    numDone++;
                    combinedDeferred.notify.call(this, subordinate, numDone / subordinates.length);
                }
            });

            $.when.apply(this, subordinates)
                .done(function () {
                    // Return the subordinates' values as one list, instead of as individual arguments.
                    combinedDeferred.resolve($.makeArray(arguments));
                })
                .fail(combinedDeferred.reject);

            return combinedDeferred.promise();
        };

        /**
         * Alternative version of $.when() that always resolves with a list of the return vales of the subordinates that resolved.
         *
         * Also progresses when individual subordinates are done. The progress event will have the resolved Promise's
         * value and the percentage of subordinates that are done as parameters.
         *
         * See Promise.all() for a note on how the progress events work.
         *
         * @static
         *
         * @param {*[]} subordinates The list of subordinates, either Promises or arbitrary values.
         * @param {Deferred} [combinedDeferred] The "combined" deferred (not Promise) to use, instead of creating it internally.
         * @return {Promise} A promise for a list of the values of the subordinates that resolved.
         */
        Promise.any = function (subordinates, combinedDeferred) {
            combinedDeferred = combinedDeferred || new $.Deferred();
            var numDone = 0;

            // Set up these first so we do not notify on
            subordinates.forEach(function (subordinate) {
                // The subordinates can be both promises and already computed synchronous values.
                // This is the same check as in $.when().
                if (Promise.isPromise(subordinate)) {
                    subordinate.done(function (arg) {
                        numDone++;
                        combinedDeferred.notify.call(this, arg, numDone / subordinates.length);
                    });
                } else {
                    numDone++;
                    combinedDeferred.notify.call(this, subordinate, numDone / subordinates.length);
                }
            });

            subordinates = subordinates.map(function (subordinate) {
                if (Promise.isPromise(subordinate)) {
                    // Always resolve subordinates rather than reject so the when() deferred always resolves.
                    return subordinate.then(null, function () {
                        numDone++;
                        return Promise.resolved();
                    });
                }
                return subordinate;
            });

            $.when.apply(this, subordinates)
                .done(function () {
                    // Return the subordinates as one list, instead of as individual arguments.
                    combinedDeferred.resolve(Array.prototype.filter.call(arguments, function (item) {
                        // Filter out empty values caused by the resolution above.
                        return item !== undefined;
                    }));
                });

            return combinedDeferred.promise();
        };

        /**
         * Determine whether the specified argument is a Promise.
         *
         * @static
         *
         * @param {*} possiblePromise
         * @return {Boolean}
         */
        Promise.isPromise = function (possiblePromise) {
            // This is how jQuery#when() does it internally.
            return $.isFunction(possiblePromise.promise);
        };

        return Promise;
    });