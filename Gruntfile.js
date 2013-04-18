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
        }
    });

    grunt.loadNpmTasks("grunt-jslint");

    grunt.registerTask("default", ["jslint"]);
};