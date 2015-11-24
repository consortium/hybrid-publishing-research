/* global module:false */
module.exports = function(grunt) {

    var port = grunt.option('port') || 8080;
    require('time-grunt')(grunt);
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/*!\n' +
                ' * consortium-viewer.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * https://github.com/consortium/hybrid-publishing-research\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (c) 2015 Hybrid Publishing Consortium\n' +
                ' * Libraries used: \n' +
                ' * Copyright (c) 2010-2015 Google, Inc. http://angularjs.org\n' +
                ' * Copyright (c) 2011-2015 Twitter, Inc. http://getbootstrap.com\n' +
                ' * Copyright 2014 jQuery Foundation,  http://jquery.com/\n' +
                ' */'
        },

        bowercopy: {
            options: {
                runBower: true,
                srcPrefix: 'bower_components'
            },
            lib: {
                options: {},
                files: {
                  'lib/js/jquery.js': 'jquery/dist/jquery.js',
                  'lib/js/jquery.color.js':'jquery-color/jquery.color.js',
                  'lib/js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
                  'lib/js/lodash.js': 'lodash/lodash.js',
                  'lib/js/angular.js': 'angular/angular.js',
                  'dist/fonts': 'bootstrap/dist/fonts/',
                  'lib/css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
                  'tmp/bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map'
                }
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: true,
                    unescape: false,
                    define: false,
                    exports: false,
                    angular: true,
                    require: false,
                    $: false,
                    _: false
                }
            },
            gruntfile: { 
                src: 'Gruntfile.js'
            }, 
            js_components: {
                src: ['js/consortium-viewer.js' ]
            }
        },
        
        concat: {
            options: {
                stripBanners: true
            },
            js: {
                src: ['lib/js/angular.js', 'lib/js/jquery.js', 'lib/js/bootstrap.js', 'lib/js/lodash.js', 'lib/jquery.color.js', 'js/analytics.js', 'js/consortium-viewer.js'],
                dest: 'tmp/main_tmp.js'
            },
            css: {
                src: ['lib/css/**.css', 'css/main.css'],
                dest: 'tmp/main_tmp.css'
            }
        },
        
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    'dist/css/all.min.css': ['tmp/main_tmp.css']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>\n',
                compress: true,
                sourceMap: true,
                mangle: false,
                nameCache: 'tmp/uglify.cache'
            },
            js: {
                files: {
                    'dist/js/all.min.js': ['tmp/main_tmp.js']
                }
            }
        },
        
        qunit: {
            files: [ 'test/*.html' ]
        },
        
        gitfetch: {
            task: {
              options: {
                all: true
              }
            }
        },

        gitreset: {
            task: {
                options: {
                    mode: 'hard',
                    commit: 'origin/master'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: './dist',
                    livereload: 35005,
                    open: true
                }
            }
        },
        
        newer: {
            options: {
            cache: 'cache/'
            }
        },
        
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [ 'Gruntfile.js', 'js/consortium-viewer.js' ],
                tasks: 'js'
            },
            html: {
                files: [ 'dist/index.html.src'],
                tasks: 'angularHtmlify'
            },
            css: {
                files: [ 'css/main.css' ],
                tasks: 'cssmin'
            },
            json: {
                files: [ 'dist/index.json' ]
            }
        },

        validation: {
            options: {
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.', 
                    'Bad value “SCHEMA.DC” for attribute “rel” on element “link”: The string “schema.dc” is not a registered keyword.',
                    'The Content-Type was “text/html”. Using the HTML parser.',
                    'Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.',
                    'Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections.',
                    'Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections.',
                    'The “name” attribute is obsolete. Consider putting an “id” attribute on the nearest container instead.',

                ],
                doctype: 'HTML5',
                reset: true,
                failHard: true
                //reset: grunt.option('reset') || false,
                //stoponerror: false,
            },
            files: {
                src: [ 'dist/docs/**/*.html', '!dist/docs/_**/*.html', '!**/assets/**']
            }
        },

        "bower-install-simple": {
            prod: {
                options: {
                    production: true
                }
            }
        },
        
        execute: {
            options: {
                // execute node with additional arguments 
                //args: ['docs/**/*.html', '!docs/_template*/*.html']
                args:['metadata.json','validation-report.json']
            },
            target: {
                src: ['createindex.js']
            }
        },
        
        angularHtmlify: {
            dist: {
                files: {
                    'dist/index.html': 'dist/index.html.src'
                }
            }
        },

        metaparser: {
            'metadata.json': ['dist/docs/**/*.html', '!dist/docs/_template*/*.html', '!**/assets/**'],
            options: {
                required: [
                    // We omit "DC" and categories in metatags. Of course they have to exist in the document i.e. "DC.title" or "DC.identifier.URL"
                    // Beware this is case sensitive. 
                    'title', 
                    'creator',
                    'subject',
                    'abstract',
                    'date',
                    'type',
                    'format',
                    'language',
                    'uRL',
                    'rights',
                    'contributor',
                    'bibliographicCitation',
                    'publisher',
                    'identifier'
                ]
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    // Dependencies
    grunt.loadNpmTasks( 'grunt-angular-htmlify' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-bowercopy' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-w3c-html-validation' );
    grunt.loadNpmTasks( 'grunt-execute' );
    grunt.loadNpmTasks( 'grunt-metaparser' );
    grunt.loadNpmTasks( 'grunt-git' );
    grunt.loadNpmTasks( 'grunt-newer' );

    // Default task
    grunt.registerTask( 'default', [ 'build', 'index', 'angularHtmlify' ] );
    
    // Building bricks
    grunt.registerTask( 'depbuild', [ 'bowercopy', 'newer:jshint',  'newer:qunit', 'newer:concat', 'newer:cssmin', 'newer:uglify', 'qunit' ] );

    // git fetch and rebase
    grunt.registerTask( 'upgrade', [ 'gitfetch', 'gitreset', 'build', 'index' ] );
    
    // Build
    grunt.registerTask( 'build', [ 'depbuild' ] );

    // Indexing
    grunt.registerTask( 'index', [ 'validation', 'metaparser', 'execute' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit', 'validation' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'connect', 'watch'] );
};
