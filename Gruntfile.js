var mozjpeg = require('imagemin-mozjpeg');
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist'],
            tmp: ['tmp']
        },
        concat: {
            options: {
                //stripBanners: true
            },
            css: {
                src: [
                    // Required
                    'Startuply/Startuply_HTML/assets/css/bootstrap.min.css',
                    'Startuply/Startuply_HTML/assets/css/font-awesome.min.css',
                    //'Startuply/Startuply_HTML/assets/css/font-lineicons.css', //removed as causing an error
                    'Startuply/Startuply_HTML/assets/css/animate.css',
                    'Startuply/Startuply_HTML/assets/css/toastr.min.css',
                    'Startuply/Startuply_HTML/assets/css/style.css',

                    /*
                    <link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="assets/css/font-awesome.min.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="assets/css/font-lineicons.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="assets/css/animate.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="assets/css/toastr.min.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="assets/css/style.css" type="text/css" media="all" />
                    */



                    'src/css/custom.css'
                ],
                dest: 'dist/css/<%= pkg.name %>.css',
                nonull: true
            },

            css2: {
                src: [
                    'Startuply/Startuply_HTML/assets/css/font-lineicons.css',
                    //'Startuply/Startuply_HTML/assets/css/style.css'

                ],
                dest: 'dist/css/<%= pkg.name %>2.css',
                nonull: true
            },

            js: {
                src: [

                    'Startuply/Startuply_HTML/assets/js/jquery-2.1.0.min.js',
                    'Startuply/Startuply_HTML/assets/js/bootstrap.min.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.flexslider-min.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.nav.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.appear.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.plugin.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.countdown.js',
                    'Startuply/Startuply_HTML/assets/js/waypoints.min.js',
                    'Startuply/Startuply_HTML/assets/js/waypoints-sticky.min.js',
                    'Startuply/Startuply_HTML/assets/js/jquery.validate.js',
                    'Startuply/Startuply_HTML/assets/js/toastr.min.js',
                    'Startuply/Startuply_HTML/assets/js/headhesive.min.js',
                    'Startuply/Startuply_HTML/assets/js/scripts.min.js'

                    // Custom js file
                    //'src/js/custom.js'

                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            },
            js4ie: {
                src: [
                    'metronic/assets/global/plugins/respond.min.js',
                    'metronic/assets/global/plugins/excanvas.min.js'
                ],
                dest: 'dist/js/ie8hacks.js'
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'Startuply/Startuply_HTML/assets/css/',
                    src: ['*.css', '!*.min.css', '!font-lineicons.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            },
            tahoe: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            },
            tahoe2: {
                src: 'dist/css/<%= pkg.name %>2.css',
                dest: 'dist/css/<%= pkg.name %>2.min.css'
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'Startuply/Startuply_HTML/assets/js',
                    src: '**/*.js',
                    dest: 'dist/assets/js/'
                }]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*'],
                dest: 'dist2/'
            }
        },
        copy: {

            fonts: {
                expand: true,
                cwd: 'Startuply/Startuply_HTML/assets/fonts/',
                src: '**/*',
                dest: 'dist/fonts/'
            }/*
            css: {
                expand: true,
                cwd: 'src/css/',
                src: '*.css',
                dest: 'dist/css/'
            },/*
            js: {
                expand: true,
                cwd: 'Startuply/Startuply_HTML/assets/js/',
                src: '*.js',
                dest: 'dist/assets/js/'
            }*/




        },
        watch: {
            files: ['src/css/*', 'src/js/*'],
            tasks: ['clean', 'concat', 'cssmin', 'uglify', 'compress', 'copy']
        },
        aws: grunt.file.readJSON('aws-credentials.json'),
        s3: {
            options: {
                accessKeyId: "<%= aws.key %>",
                secretAccessKey: "<%= aws.secret %>",
                region: "<%= aws.region %>",
                bucket: "<%= aws.bucket %>",
                charset: 'utf-8',
                enableWeb: true,
                cache: true, // change to false if you want to force all files onto s3
                headers: {
                    CacheControl: 60000 //1 min?, public
                }
            },
            build: {
                cwd: "dist/",
                src: "**"
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'Startuply/Startuply_HTML/assets/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/img/'                  // Destination path prefix
                }]
            }
        },
        minifyHtml: {
            options: {
                cdata: true
            },
            dist: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        uncss: {
            dist: {
                options: {
                  ignoreSheets: ['/css/vmeretail2.min.css']
                },
                files: {
                    'dist/css/vmeretailtidy.min.css': ['dist/srcindex.html']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index2.html': ['dist/srcindex.html']
                }
            }
        },
        spriteGenerator: {
            options: {},
            default_task: {
                files: {
                    'dest/images/default_options.png': ['src/css/custom.css']
                }
            }
        },
        sprite:{
            all: {
                //src: 'Startuply/Startuply_HTML/assets/img/**/*.png',
                cwd: 'Startuply/Startuply_HTML/assets/img/',
                src: ['**/*.{png}'],
                destImg: 'dist/images/spritesheet.png',
                destCSS: 'src/css/custom.css',
                'imgPath': '../images/spritesheet.png'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-minify-html');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-spritesmith');
    //grunt.loadNpmTasks('grunt-sprite-generator');

    //grunt.registerTask('default', [ 'clean', 'copy', 'concat:css', 'cssmin', 'concat:js', 'concat:js4ie', 'uglify:js', 'clean:tmp' ]);
    //grunt.registerTask('default', [ 'clean', 'copy', 'concat:css', 'concat:css2','cssmin', 'imagemin', 'concat:js', 'concat:js4ie', 'uglify:js', 'uncss', 'processhtml', 'minifyHtml', 'clean:tmp' ]);
    grunt.registerTask('default', [ 'clean', 'sprite', 'copy', 'concat:css', 'cssmin:tahoe', 'cssmin:tahoe2', 'uglify', 'minifyHtml', 'imagemin', 'clean:tmp' ]);
    grunt.registerTask('deploy', [ 's3' ]);

};