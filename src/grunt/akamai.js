/*global module*/
module.exports = function (grunt) {
    "use strict";

    /**
     * Task for purging URLs on Akamai.
     *
     * Takes it's options as command line arguments rather than Gruntfile settings so it can be used by
     * a CI system without exposing internal data.
     *
     * Command line options:
     * user        Akamai username.
     * password    Akamai password.
     * notify      Email addresses to notify on purge completion. Optional.
     * localBase   Path to local folders to get relative file paths that should be purged from.
     *             E.g. point it at a build output directory that has been deployed, and all the file paths from it will be purged.
     * remoteBase: URLs where the localBase file paths will be appended. The resulting URLs are then purged. Must include protocol.
     *
     * E.g. localBase resolves to ["test.js", "css/test.css"] and remoteBase is "http://www.example.com/".
     * This then purges "http://www.example.com/test.js" and "http://www.example.com/css/test.css".
     *
     * Separate list items with commas.
     *
     * @author Bo Gotthardt
     */

    function getAkamaiUrls() {
        var localFiles = [],
            purgeUrls = [],
            localBases = grunt.option("localBase"),
            rawRemoteBases = grunt.option("remoteBase"),
            remoteBases = [];

        if (!localBases) {
            grunt.fail.warn("--localBase must be specified");
        }
        if (!rawRemoteBases) {
            grunt.fail.warn("--remoteBase must be specified");
        }

        localBases.split(";").forEach(function (localbase) {
            localFiles = localFiles.concat(grunt.file.expand({
                cwd: localbase
            }, "**/*"));
        });

        rawRemoteBases.split(";").forEach(function (rawRemoteBase) {
            if (rawRemoteBase.indexOf("//") === 0) {
                remoteBases.push("http:" + rawRemoteBase);
                remoteBases.push("https:" + rawRemoteBase);
            } else {
                remoteBases.push(rawRemoteBase);
            }
        });

        remoteBases.forEach(function (remoteBase) {
            purgeUrls = purgeUrls.concat(localFiles.map(function (localFile) {
                return remoteBase + localFile;
            }));
        });

        grunt.log.subhead("Purging:");
        purgeUrls.forEach(function (purgeUrl) {
            grunt.log.writeln(purgeUrl);
        });

        return purgeUrls;
    }

    grunt.loadNpmTasks("grunt-akamai-clear");

    grunt.registerTask("purge-dryrun", "Lists the URLs that would be purged by running the 'purge' task with the same options.", getAkamaiUrls);

    grunt.registerTask("purge", "Purges URLs from Akamai's cache.", function () {
        var user = grunt.option("user"),
            password = grunt.option("password"),
            notify = grunt.option("notify");

        if (!user) {
            grunt.fail.warn("--user must be specified");
        }
        if (!password) {
            grunt.fail.warn("--password must be specified");
        }

        grunt.initConfig({
            akamai: {
                purge: {
                    user: user,
                    password: password,
                    notify: notify.split(","),
                    urls: getAkamaiUrls()
                }
            }
        });

        grunt.task.run("akamai:purge");
    });
};