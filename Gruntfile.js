/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        jslint: {
            files: ["src/main/javascript/**/*.js",
                    "src/test/javascript/**/*.js",
                    "Gruntfile.js",
                    "package.json"],
            exclude: ["src/main/javascript/lib/*.js"],
            directives: {
                plusplus: true,
                vars: true,
                nomen: true,
                todo: true,
                predef: ["define"]
            },
            options: {
                jslintXml: "target/jslint.xml",
                junit: "target/jslint-junit.xml",
                checkstyle: "target/jslint-checkstyle.xml"
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
            compile: {
                options: {
                    name: "widget",
                    out: "target/widget.min.js",
                    deps: ["lib/require",
                           "require.config.js",
                           "widget/TextWidget",
                           "widget/ImageWidget"]
                }
            }
        },
        cssmin: {
            options: {
                report: "min"
            },
            compress: {
                files: {
                    "target/widget.min.css": ["src/main/css/**/*.css"]
                }
            }
        },
        copy: {
            main: {
                files: [{
                    src: "src/main/resources/widget.html",
                    dest: "target/widget.html"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", [/*"jslint", */"requirejs", "cssmin", "copy"]);
};