
module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },

            /**
             * ==================== concat js =============
             */
            main_lib_js: { //------- main.lib.js -------
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery.cookie/jquery.cookie.js',
                    'bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/angular-gravatar/build/angular-gravatar.min.js',
                    'bower_components/ng-file-upload/ng-file-upload.min.js',
                    'bower_components/ng-click-select/ng-click-select.js',
                    'bower_components/angular-utils-pagination/dirPagination.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/file-saver.js/FileSaver.js',
                    'bower_components/angular-google-analytics/dist/angular-google-analytics.js',

                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.joyride.js',
                    'bower_components/foundation/js/foundation/foundation.tooltip.js',
                    'bower_components/foundation-datepicker/js/foundation-datepicker.js',
                    'bower_components/foundation/js/foundation.min.js',

                    'app/lib/js/highcharts.js'
                ],
                dest: 'web/js/main.lib.js'
            },

            main_app_js: { //------- main.app.js -------
                src: [
                    'app/scripts/*.js',
                    'app/modules/base/*.js', 'app/modules/base/*/*.js',
                    'app/modules/billing/*.js', 'app/modules/billing/*/*.js',
                    'app/modules/customer/*.js', 'app/modules/customer/*/*.js',
                    'app/modules/dashboard/*.js', 'app/modules/dashboard/*/*.js',
                    'app/modules/gateway/*.js', 'app/modules/gateway/*/*.js',
                    'app/modules/guide/*.js', 'app/modules/guide/*/*.js',
                    'app/modules/myaccount/*.js', 'app/modules/myaccount/*/*.js',
                    'app/modules/notification/*.js', 'app/modules/notification/*/*.js',
                    'app/modules/payment/*.js', 'app/modules/payment/*/*.js',
                    'app/subapps/ech/*.js', 'app/subapps/ech/*/*.js'
                ],
                dest: 'web/js/main.app.js'
            },
            login_app_js: { //------- login.app.js -------
                src: [
                    'app/scripts/*.js',
                    'app/modules/base/*.js', 'app/modules/base/*/*.js',
                    'app/modules/auth/*.js', 'app/modules/auth/*/*.js',
                    'app/subapps/auth/*.js', 'app/subapps/auth/*/*.js'
                ],
                dest: 'web/js/login.app.js'
            },

            /**
             * ==================== concat css =============
             */
            main_lib_css: { //------- main.lib.css -------
                src: [
                    'bower_components/normalize.css/normalize.css',
                    'bower_components/foundation/css/foundation.css',
                    'bower_components/foundation-icon-fonts/foundation-icons.css',
                    'bower_components/jquery-ui/themes/base/jquery-ui.css',
                ],
                dest: 'web/css/main.lib.css'
            },
            main_app_css: { //------- main.app.css -------
                src: [
                    'app/styles/contact/*.css',
                ],
                dest: 'web/css/main.app.css'
            }
        },

        copy: {
            foundation_fonts: {
                files: [
                    {expand: true, src: ['bower_components/foundation-icon-fonts/foundation-icons.eot'], flatten: true,  dest: 'web/css', filter: 'isFile'},
                    {expand: true, src: ['bower_components/foundation-icon-fonts/foundation-icons.svg'], flatten: true,  dest: 'web/css', filter: 'isFile'},
                    {expand: true, src: ['bower_components/foundation-icon-fonts/foundation-icons.ttf'], flatten: true,  dest: 'web/css', filter: 'isFile'},
                    {expand: true, src: ['bower_components/foundation-icon-fonts/foundation-icons.woff'], flatten: true,  dest: 'web/css', filter: 'isFile'},
                ]
            },
            app_fonts: {
                expand: true,
                src: '**',
                dest: 'web/fonts/',
                cwd: 'app/fonts',
                flatten: true,
                filter: 'isFile'
            },
            jquery_ui_images: {
                expand: true,
                src: '**',
                dest: 'web/css/images/',
                cwd: 'bower_components/jquery-ui/themes/base/images',
                flatten: true,
                filter: 'isFile'
            },
            app_images: {
                expand: true,
                src: '**',
                dest: 'web/images/',
                cwd: 'app/images',
                flatten: true,
                filter: 'isFile'
            },
            css: {
                expand: true,
                src: '**',
                dest: 'web/css/',
                cwd: 'app/styles/copy',
                flatten: true,
                filter: 'isFile'
            },
            config: {
                expand: true,
                src: '**',
                dest: 'web/config/',
                cwd: 'app/config',
                flatten: true,
                filter: 'isFile'
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            main_lib_min: {
                expand: true,
                cwd: 'web/css/',
                src: ['main.lib.css'],
                dest: 'web/css/',
                ext: '.css'
            },
            main_app_min: {
                expand: true,
                cwd: 'web/css/',
                src: ['main.app.css'],
                dest: 'web/css/',
                ext: '.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: false
            },
            main_lib_js: {
                files: {
                    'web/js/main.lib.js': ['web/js/main.lib.js']
                }
            },
            app_lib_js: {
                files: {
                    'web/js/main.app.js': ['web/js/main.app.js']
                }
            },
            login_lib_js: {
                files: {
                    'web/js/login.app.js': ['web/js/login.app.js']
                }
            }
        },

        watch: {
            scripts: {
                files: ['app/modules/**/*.js', 'app/subapps/**/*.js', 'app/scripts/*.js', 'app/config/*.json'],
                tasks: ['onScriptWatch'],
                options: {
                    spawn: false
                }
            },

            css: {
                files: ['app/styles/**/*.css'],
                tasks: ['onCssWatch'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('onScriptWatch', [
        'concat:main_app_js',
        'concat:login_app_js',
        'watch:scripts',
    ]);

    grunt.registerTask('onCssWatch', [
        'concat:main_app_css',
        'copy:css',
        'watch:css',
    ]);

    grunt.registerTask('default', [
        'concat',
        'copy',
    ]);

    grunt.registerTask('defaultProd', [
        'concat',
        'copy',
        'uglify',
        'cssmin',
    ]);
};
