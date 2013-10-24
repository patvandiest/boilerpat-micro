module.exports = function (grunt) {
    'use strict';
    // show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.initConfig({
        // configurable paths
        micro: {
            src: 'src',
            server: '.temp',
            test: '.test',
            build: 'build'
        },

        // Assemble Task
        assemble: {
            options: {
                layoutdir: '<%= micro.src %>/layouts',
                partials: ['<%= micro.src %>/partials/**/*.hbs'],
                data: ['<%= micro.src %>/data/**/*.{json,yml}']
            },
            server: {
                options: {
                    layout: 'default.hbs',
                    flatten: true
                },
                src: ['<%= micro.src %>/pages/*.hbs'],
                dest: '<%= micro.server %>/'
            },
            test: {
                options: {
                    layout: 'default.hbs',
                    flatten: true
                },
                src: ['<%= micro.src %>/pages/*.hbs'],
                dest: '<%= micro.test %>/'
            },
            prod: {
                options: {
                    layout: 'default.hbs',
                    flatten: true
                },
                src: ['<%= micro.src %>/pages/*.hbs'],
                dest: '<%= micro.build %>/'
            },
        },

        // Watch Task
        watch: {
            compass: {
                files: ['<%= micro.src %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            styles: {
                files: ['<%= micro.src %>/styles/{,*/}*.css'],
                tasks: ['copy:styles']
            },
            assm: {
                files: ['<%= micro.src %>/{,*/}*.hbs'],
                tasks: ['assemble:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= micro.server %>/*.html',
                    '<%= micro.server %>/assets/css/{,*/}*.css',
                    '<%= micro.server %>/assets/js/{,*/}*.js',
                    '<%= micro.server %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // Connect Task
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= micro.server %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%= micro.src %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= micro.build %>'
                }
            }
        },

        // Clean Task
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= micro.build %>/*',
                        '!<%= micro.build %>/.git*'
                    ]
                }]
            },
            server: '<%= micro.server %>'
        },

        // JSHint tasks
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= micro.src %>/scripts/{,*/}*.js',
                '!<%= micro.src %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // SASS Task
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                src: '<%= micro.src %>/styles/main.scss',
                dest: '<%= micro.server %>/assets/css/main.css',
            },
            test: {
                options: {
                    style: 'expanded'
                },
                src: '<%= micro.src %>/styles/main.scss',
                dest: '<%= micro.test %>/assets/css/main.css',
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                src: '<%= micro.src %>/styles/main.scss',
                dest: '<%= micro.build %>/assets/css/main.css',
            },
        },

        // Uglify Task
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'all',
                    beautify: true
                },
                files: {
                    '<%= micro.server %>/assets/js/vendor.js': [
                        '<%= micro.src %>/scripts/vendor/jquery-1.10.1.min.js',
                        '<%= micro.src %>/scripts/vendor/modernizr-2.6.2.min.js'
                    ],
                    '<%= micro.server %>/assets/js/all.js': [
                        '<%= micro.src %>/scripts/*.js',
                        '!<%= micro.src %>/scripts/*.min.js'
                    ]
                }
            },
            prod: {
                options: {
                    mangle: true,
                    compress: true,
                },
                files: {
                    '<%= micro.build %>/assets/js/vendor.js': [
                        '<%= micro.src %>/scripts/vendor/jquery-1.10.1.min.js',
                        '<%= micro.src %>/scripts/vendor/modernizr-2.6.2.min.js'
                    ],
                    '<%= micro.build %>/assets/js/all.js': [
                        '<%= micro.src %>/scripts/*.js',
                        '!<%= micro.src %>/scripts/*.min.js'
                    ]
                }
            },
        },

        // CSSMin Task
        cssmin: {
            addBanner: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    '<%= micro.build %>/assets/css/main.css': '<%= micro.test %>/assets/css/main.css'
                }
            }
        },

        // Imagemin Task
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= micro.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= micro.build %>/assets/img'
                }]
            }
        },

        // SVGmin Task
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= micro.src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= micro.build %>/assets/img'
                }]
            }
        },

        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>',
                    dest: '<%= micro.build %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            test: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>/styles',
                    dest: '<%= micro.test %>/assets/css',
                    src: '{,*/}*.css'
                },
                // other files
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>',
                    dest: '<%= micro.test %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                },
                ]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>/styles',
                    dest: '<%= micro.server %>/assets/css',
                    src: '{,*/}*.css'
                },
                // other files
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>',
                    dest: '<%= micro.server %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                },
                ]
            },
            prod: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>/styles',
                    dest: '<%= micro.build %>/assets/css',
                    src: '{,*/}*.css'
                },
                // other files
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= micro.src %>',
                    dest: '<%= micro.build %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                },
                ]
            },
        },

        // Concurrent Task
        concurrent: {
            server: [
                'sass:dev',
                'assemble:server',
                'copy:server',
                'uglify:dev'
            ],
            test: [
                'sass:test',
                'assemble:test',
                'copy:test'
            ],
            dist: [
                'sass:prod',
                'copy:prod',
                'imagemin',
                'svgmin',
                'cssmin',
                'uglify:prod'
            ]
        },
    });


    // Register All Tasks
    grunt.registerTask('server', [
        'clean:server',
        'concurrent:server',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'assemble:prod',
        'concurrent:dist',
        'copy:dist',
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);


    // Load npm plugins to provide necessary tasks.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-svgmin');
};
