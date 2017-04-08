module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build: {
                src: ["lib/*.ts", "!node_modules/**/*.ts"], // Avoid compiling TypeScript files in node_modules,
                dest: "compiled/",
                options: {
                    module: 'commonjs', // To compile TypeScript using external modules like NodeJS
                    fast: 'never', // You'll need to recompile all the files each time for NodeJS,
                    target: 'es6'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");

    // Default tasks.
    grunt.registerTask('default', ["ts:build"]);
};