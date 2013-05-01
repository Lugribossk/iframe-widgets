define(["util/Logger"],
    function (Logger) {
        "use strict";
        var log = new Logger("ViewerAPIFinder");

        function isViewerAPIObject(obj) {
            // TODO obj instanceof this.frame.com.zmags.api.Viewer ?
            return obj.setPublicationID;
        }

        /**
         * Utility class for trying to find a viewer object created by the Viewer API in another frame.
         *
         * @author Bo Gotthardt
         * @constructor
         *
         * @param {Window} frame The frame to look for the object in.
         */
        function ViewerAPIFinder(frame) {
            this.frame = frame;
        }

        /**
         * Try to automatically find the viewer object.
         * May not be able to find it even if it exists, e.g. if it has been created inside a closure.
         *
         * Should work if it was created with the API example code or the PS framework.
         *
         * @returns {Viewer|null} The object, or null if it could not be found.
         */
        ViewerAPIFinder.prototype.findViewerObject = function () {
            var defaultName = "viewer",
                frame = this.frame,
                prop;

            // Try the "viewer" variable name used in the API example code.
            if (frame[defaultName] && isViewerAPIObject(frame[defaultName])) {
                return frame[defaultName];
            }

            // Try getting it from the PS framework.
            if (frame.com && frame.com.zmags && frame.com.zmags.ps) {
                return frame.com.zmags.ps.require("viewer").viewerAPI;
            }

            // Try all the top-level variables. Yes this is a bit hacky...
            for (prop in frame) {
                if (frame.hasOwnProperty(prop)) {
                    if (isViewerAPIObject(prop)) {
                        return prop;
                    }
                }
            }

            log.warn("Viewer API object not found automatically.");
            return null;
        };

        /**
         * Get the viewer object with the specified name.
         * Assumes that the object exists, and is actually created by the Viewer API.
         *
         * @param {String} name The top-level variable name of the object.
         * @returns {Viewer} The object
         */
        ViewerAPIFinder.prototype.getViewerObject = function (name) {
            var obj = this.frame[name];

            log.assert(obj, "Viewer API object not found with name:", name);
            log.assert(isViewerAPIObject(obj), name, "found, but does not appear to be a Viewer API object.");

            return obj;
        };

        return ViewerAPIFinder;
    });