module.exports = function(grunt) {

    var configBridge = grunt.file.readJSON('./configBridge.json', { encoding: 'utf8' });

    // Project configuration.
    grunt.initConfig({

        bootstrap: configBridge.config.bootstrap.join('\n'),
        theme: configBridge.config.theme.join('\n'),
        tpl_css: configBridge.config.tpl_css.join('\n'),


        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            plazart_admin: [
                '<%= plazartadmin %>/js/layout.admin.js',
                '<%= plazartbase %>/js/*.js',
                '!<%= plazartbase %>/js/*.min.js'
            ]
        },

        uglify: {
            bootstrap: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= yourjsfiles %>/script.js.map'
                },
                files: {
                    '<%= yourjsfiles %>/script.min.js': ['<%= yourjsfiles %>/alert.js','<%= yourjsfiles %>/button.js']
                }
            }
        },

        concat: {
            catscript: {
                src: [
                    '<%= yourjsfiles %>/*.js'
                ],
                dest: '<%= yourjsfiles %>/allscript.js'
            }
        },

        watch: {
            lesscompile: {
                files: ['<%= bootstrap %>/*.less', '<%= theme %>/*.less'],
                tasks: ['less-compile']
            }
        },

        less: {
            bootstrap: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: '<%= tpl_css %>/bootstrap.css.map'
                },
                src: '<%= bootstrap %>/bootstrap.less',
                dest: '<%= tpl_css %>/bootstrap.css'
            },
            theme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'style.css.map',
                    sourceMapFilename: '<%= tpl_css %>/style.css.map'
                },
                src: '<%= theme %>/style.less',
                dest: '<%= tpl_css %>/style.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: '<%= yourcss %>/bootstrap.css'
            },
            theme: {
                options: {
                    map: true
                },
                src: '<%= yourcss %>/bootstrap-theme.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                //keepSpecialComments: '*',
                advanced: false
            },
            minifyCore: {
                src: '<%= tpl_css %>/bootstrap.css',
                dest: '<%= tpl_css %>/bootstrap.min.css'
            },
            style: {
                src: '<%= tpl_css %>/style.css',
                dest: '<%= tpl_css %>/style.min.css'
            }

        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= topBanner %>'
            },
            files: {
                src: '<%= yourcss %>/*.css'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: [
                '<%= yourcss %>/bootstrap.css',
                '<%= yourcss %>/bootstrap-theme.css'
            ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Load tasks.
    //require('matchdep').filterDev(['grunt-*', '!grunt-legacy-util']).forEach( grunt.loadNpmTasks );

    grunt.registerTask('plazat-hint', ['jshint:plazart_admin']);
    grunt.registerTask('less-compile', ['less:bootstrap', 'less:theme', 'cssmin:minifyCore', 'cssmin:style']);
    grunt.registerTask('minify-bootstrap', ['cssmin:minifyCore', 'cssmin:minifyTheme']);
    grunt.registerTask('minify-all', ['cssmin:all']);
    grunt.registerTask('minifyjs-bootstrap', ['uglify:bootstrap']);
    grunt.registerTask('concat-js-bootstrap', ['concat:catscript']);

};