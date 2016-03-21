module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            }
            //apps: {
            //    src: ['client/assets/*.js'],
            //    dest: 'server/public/assets/applications.min.js'
            //}
            //factories: {
            //    src:['client/assets/factories/*.js'],
            //    dest: 'server/public/assets/factories.min.js'
            //}
        },
        copy: {
            options: {
                rebase: false
            },
            vendor: {
                expand: true,

                // VENDORS

                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "ng-parallax/js/ngParallax.min.js",
                    "angular-scroll/angular-scroll.min.js",
                    "angular-scroll/angular-scroll.min.js.map",
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.js",
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/css/bootstrap.min.css.map",
                    "bootstrap/js/modal.js",
                    "jquery-smooth-scroll/jquery.smooth-scroll.min.js"
                ],
                "dest": "server/public/vendors/"
            },


            css: {
                // STYLES
                expand: true,
                cwd: "client/styles/",
                src: "styles.css",
                "dest": "server/public/styles"
            },

            html: {
                // VIEWS
                expand: true,
                cwd: "client/views/",
                src: "**",
                "dest": "server/public/views"
            },

            scripts: {
                // SCRIPTS
                expand: true,
                cwd: "client/assets/",
                src: ["*.js"],
                "dest": "server/public/assets"
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
