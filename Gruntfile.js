/*global module*/
module.exports = function (grunt) {
    "use strict";

    var buildHtml = {
        replacements: [{
            pattern: /\s*<script src="lib\/require\.js"><\/script>/,
            replacement: ""
        }, {
            pattern: /\s*<script src="require\.config\.js"><\/script>/,
            replacement: ""
        }, {
            pattern: "${build}",
            replacement: "<%= revision %> <%= grunt.template.today('UTC:yyyy/mm/dd HH:MM:ss Z') %>"
        }]
    };

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                ignores: ["src/main/javascript/lib/**/*.js",
                          "src/main/javascript/full-page-video/**/*.js"]
            },
            all: {
                src: ["src/main/javascript/**/*.js",
                      "src/test/javascript/**/*.js",
                      "Gruntfile.js",
                      "package.json"]
            }
        },
        requirejs: {
            options: {
                baseUrl: "src/main/javascript",
                mainConfigFile: "src/main/javascript/require.config.js",
                logLevel: 1,
                optimize: "uglify2",
                preserveLicenseComments: false,
                generateSourceMaps: true
            },
            widget: {
                options: {
                    name: "widget",
                    out: "target/widget/widget.js",
                    deps: ["lib/require",
                           "require.config.js",
                           "widget/TextWidget",
                           "widget/ImageWidget",
                           "widget/ShareWidget"]
                }
            },
            configure: {
                options: {
                    name: "configure",
                    out: "target/configure/configure.js",
                    deps: ["lib/require",
                           "require.config.js"]
                }
            }
        },
        "git-describe": {
            options: {
                prop: "revision"
            },
            describe: {}
        },
        "string-replace": {
            widget: {
                options: buildHtml,
                files: [{
                    src: "src/main/javascript/widget.html",
                    dest: "target/widget/widget.html"
                }]
            },
            configure: {
                options: buildHtml,
                files: [{
                    src: "src/main/javascript/configure.html",
                    dest: "target/configure/configure.html"
                }]
            },
            analytics: {
                options: {
                    replacements: [{
                        pattern: "</body>",
                        replacement: "<script>" +
                        "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
                            "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
                            "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
                        "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
                        "ga('create', '" + grunt.option("id") + "', '" + grunt.option("domain") + "');" +
                        "ga('send', 'pageview');" +
                        "</script></body>"
                    }]
                },
                files: [{
                    src: grunt.option("file"),
                    dest: grunt.option("file")
                }]
            }
        },
        copy: {
            configure: {
                files: [{
                    expand: true,
                    cwd: "src/main/javascript/styling",
                    src: ["img/**", "font/**", "lib/*.png", "lib/*.gif"],
                    dest: "target/configure/styling"
                }]
            }
        },
        clean: {
            // Trying to delete the target folder itself makes the requirejs task randomly fail.
            widget: ["target/widget/**/*"],
            configure: ["target/configure/**/*"]
        }
    });

    grunt.loadTasks("src/grunt");
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("default", ["widget"]);

    grunt.registerTask("widget",    ["jshint:all",
                                     "clean:widget",
                                     "requirejs:widget",
                                     "git-describe",
                                     "string-replace:widget"]);

    grunt.registerTask("configure", ["jshint:all",
                                     "clean:configure",
                                     "requirejs:configure",
                                     "git-describe",
                                     "string-replace:configure",
                                     "copy:configure"]);
};