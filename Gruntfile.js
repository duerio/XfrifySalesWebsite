var mozjpeg = require('imagemin-mozjpeg');
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Empty the dist and _tmp directory (https://www.npmjs.org/package/grunt-contrib-clean)
        clean: {
                dist: ['dist'],
                tmp: ['_tmp']
            },

        // Concatenate all individual CSS files into _tmp/css/tahoewww.css (https://www.npmjs.org/package/grunt-contrib-concat)
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
                        'src/css/custom.css'

                        /*
                        <link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css" media="all" />
                        <link rel="stylesheet" href="assets/css/font-awesome.min.css" type="text/css" media="all" />
                        <link rel="stylesheet" href="assets/css/font-lineicons.css" type="text/css" media="all" />
                        <link rel="stylesheet" href="assets/css/animate.css" type="text/css" media="all" />
                        <link rel="stylesheet" href="assets/css/toastr.min.css" type="text/css" media="all" />
                        <link rel="stylesheet" href="assets/css/style.css" type="text/css" media="all" />
                        */
                    ],
                    dest: '_tmp/css/<%= pkg.name %>.css',
                    nonull: true
                },

                js: { //DB: THAT DOESN'T SEEM TO WORK
                    src: [
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
                        'Startuply/Startuply_HTML/assets/mailchimp/js/mailing-list.js',
                        'Startuply/Startuply_HTML/assets/js/scripts.min.js',


                        // Custom js file
                        //'src/js/custom.js'

                    ],
                    dest: 'dist/js/<%= pkg.name %>.js'
                },
                js4ie: { //DB: WHAT'S THAT FOR?
                    src: [
                        'metronic/assets/global/plugins/respond.min.js',
                        'metronic/assets/global/plugins/excanvas.min.js'
                    ],
                    dest: 'dist/js/ie8hacks.js'
                }
            },

        // Copy various files to _tmp  (https://www.npmjs.org/package/grunt-contrib-copy)
        copy: {
            tmp: {
                files: [
                    {//fonts
                        expand: true,
                        cwd: 'Startuply/Startuply_HTML/assets/fonts/',
                        src: '*',
                        dest: '_tmp/fonts'
                    },
                    {//\css exception
                        expand: true,
                        flatten:true,
                        src: 'Startuply/Startuply_HTML/assets/css/font-lineicons.css',
                        dest: '_tmp/css'
                    },
                    {//custom images
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: '_tmp/img/'
                    },
                ],
            },
            js: { //javascript
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'Startuply/Startuply_HTML/assets/js/',
                        src: ['jquery-1.11.0.min.js', 'jquery-2.1.0.min.js','jquery-migrate-1.2.1.min.js', 'bootstrap/js/bootstrap.min.js'],
                        dest: '_tmp/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'Startuply/Startuply_HTML/assets/js/',
                        src: ['jquery.*.js' ],
                        dest: '_tmp/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'Startuply/Startuply_HTML/assets/js/',
                        src: ['jquery.*.js','bootstrap.min.js','waypoints*.js','toastr.min.js*','headhesive.min.js','scripts.js' ],
                        dest: '_tmp/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'Startuply/Startuply_HTML/assets/mailchimp/js/',
                        src: ['mailing-list.js' ],
                        dest: '_tmp/js/'
                    },

                ],
            },
            final: { // all except tahoewww.css and JS.
                expand: true,
                cwd: '_tmp',
                src: ['*/**','!**/tahoewww.css', '!js/*', '!img/**'],
                dest: 'dist'
            }

        },

        // Uglify the _tmp/js/*.js into dist/js/ (https://www.npmjs.org/package/grunt-contrib-uglify)
        uglify: {
                    my_target: {
                        files: [{
                            expand: true,
                            cwd: '_tmp/js',
                            src: '**/*.js',
                            dest: 'dist/js/'
                        }]
                    }
                },

        // Replace individual CSS references with tahoewww.min.css instead into the _tmp/index_tmp.html (https://www.npmjs.org/package/grunt-processhtml)
        processhtml: { //DB: Added To replace individual CSS ref with tahoewww.min.css instead in the dist/index.html
            dist: {
                files: {
                    '_tmp/index.html': ['src/index.html']
                }
            }
        },

        // Minify the _tmp/css/tahoewww.css into _tmp/css/tahoewww.min.css (https://www.npmjs.org/package/grunt-contrib-cssmin)
        cssmin: {
            minify: {
                expand: true,
                cwd: '_tmp/css/',
                src: ['*.css', '!*.min.css', '!font-lineicons.css'],
                dest: '_tmp/css/',
                ext: '.min.css'
            }
        },

        // Minify images in '_tmp/img/' to 'dist/img/' (https://www.npmjs.org/package/grunt-contrib-imagemin)
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '_tmp/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/img/'                  // Destination path prefix
                }]
            }
        },

        // Replace various paths in the *.html files (https://www.npmjs.org/package/grunt-text-replace)
        replace: {
            img: {
                src: ['_tmp/*.html'],             // source files array (supports minimatch)
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: 'frontend/onepage/img/',                   // string replacement
                    to: 'img/'
                }, ]
            },
            js: {
                src: ['_tmp/*.html'],             // source files array (supports minimatch)
                overwrite: true,                 // overwrite matched source files

                replacements: [
                    {
                        from: 'src="../Startuply/Startuply_HTML/assets/js/',                   // string replacement
                        to: 'src="js/'
                    },
                    {
                        from: 'src="../Startuply/Startuply_HTML/assets/mailchimp/js/',                   // string replacement
                        to: 'src="js/'
                    },
                ]

            }

        },

        // Minify the 'tmp/index.html' into 'dist/index.html' (https://www.npmjs.org/search?q=minify-html)
        minifyHtml: {
            options: {
                //cdata: true,        // KEEP CDATA from scripts
                loose: true         // KEEP retain one whitespace (doesn't work right without here)
            },
            dist: {
                files: {
                    'dist/index.html': '_tmp/index.html'
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Compress in gzip format the dist/ directory content into the dist2/ (https://www.npmjs.org/package/grunt-contrib-compress)
            compress: { //DB: NOT USED AT THE MOMENT
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

        // A predefined tasks whenever watched file patterns are added, changed or deleted. (https://www.npmjs.org/package/grunt-contrib-watch)
            watch: { //DB: NOT USED AT THE MOMENT
                files: ['src/css/*', 'src/js/*'],
                tasks: ['clean', 'concat', 'cssmin', 'uglify', 'compress', 'copy']
            },

        // A Grunt interface into the Amazon Web Services Node.JS SDK (https://www.npmjs.org/package/grunt-aws)
            aws: grunt.file.readJSON('aws-credentials.json'),

        // A grunt task to automate moving files to/from Amazon S3 (https://www.npmjs.org/package/grunt-s3)
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

        // Remove unused CSS style (https://www.npmjs.org/package/grunt-uncss)
            uncss: { //DB: TRIED IT BUT IT IS CAUSING PROBLEMS, UNCSS CAN'T DETECT STYLES ADDED
                     //    BY USER INTERACTION WITH THE PAGE SO EVERYTHING THAT IS NOT RECOGNISED
                     //    NEEDS EXCLUDED MANUALLY SO IT IS A PAIN (E.G. HOVER, CLICK, ETC...)
                dist: {
                    options: {
                        ignore: ['#added_at_runtime', '.created_by_jQuery']
                    },
                    files: {
                        'dist/css/<%= pkg.name %>.min.css': ['src/index.html']
                    }
                }
            },

        // Convert a set of images into a spritesheet and corresponding CSS variables (https://www.npmjs.org/package/grunt-spritesmith)
            spriteGenerator: { //DB: PROBABLY BEST IMPLEMENTED ONCE THE WEBSITE IS CLOSE TO FINISHED
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
                //cwd: 'Startuply/Startuply_HTML/assets/img/',
                //cwd: 'src/img/',
                //src: ['**/*.{png}'],
                src: ['src/img/features/**/*.png'],

                destImg: 'dist/images/spritesheet.png',
                destCSS: 'src/css/custom2.css',
                'imgPath': '../images/spritesheet.png'
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-minify-html');
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-spritesmith');

    //grunt.loadNpmTasks('grunt-sprite-generator');

    //grunt.registerTask('default', [ 'clean', 'copy', 'concat:css', 'cssmin', 'concat:js', 'concat:js4ie', 'uglify:js', 'clean:tmp' ]);
    //grunt.registerTask('default', [ 'clean', 'copy', 'concat:css', 'concat:css2','cssmin', 'imagemin', 'concat:js', 'concat:js4ie', 'uglify:js', 'uncss', 'processhtml', 'minifyHtml', 'clean:tmp' ]);

    //DB: Original grunt.registerTask was including the "Sprite task which was currently overwriting the custom.css so I've disabled it for now
    //grunt.registerTask('default', [ 'clean', 'sprite', 'copy', 'concat:css', 'cssmin:tahoe', 'cssmin:tahoe2', 'uglify', 'minifyHtml', 'imagemin', 'clean:tmp' ]);
    //grunt.registerTask('default', [ 'clean', 'concat:css', 'concat:js', 'copy:tmp', 'copy:js', 'cssmin:tahoe', 'uglify', 'processhtml','cssmin:tahoe' , 'imagemin',  'replace', 'minifyHtml', 'copy:final' ]);
    grunt.registerTask('default', [ 'clean', 'concat:css', 'concat:js', 'copy:tmp', 'copy:js', 'uglify', 'processhtml','cssmin' , 'imagemin',  'replace', 'minifyHtml', 'copy:final' ]);

    grunt.registerTask('deploy', [ 's3' ]);


};