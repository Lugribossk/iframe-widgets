/*global module*/
module.exports = function (grunt) {
    "use strict";

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
                    deps: ["requirejs",
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
                    deps: ["requirejs",
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
            options: {
                replacements: [{
                    pattern: "<script src=\"../../../components/requirejs/require.js\"><\/script>",
                    replacement: ""
                }, {
                    pattern: "<script src=\"require.config.js\"><\/script>",
                    replacement: ""
                }, {
                    pattern: "${build}",
                    replacement: "<%= revision %> <%= grunt.template.today('UTC:yyyy/mm/dd HH:MM:ss Z') %>"
                }]
            },
            widget: {
                files: [{
                    src: "src/main/javascript/widget.html",
                    dest: "target/widget/widget.html"
                }]
            },
            configure: {
                files: [{
                    src: "src/main/javascript/configure.html",
                    dest: "target/configure/configure.html"
                }]
            }
        },
        copy: {
            configure: {
                files: [{
                    expand: true,
                    cwd: "components/font-awesome/build/assets/font-awesome/",
                    src: ["font/**"],
                    dest: "target/configure/styling"
                }, {
                    expand: true,
                    cwd: "components/bootstrap-colorpicker",
                    src: ["img/**"],
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

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-git-describe");

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