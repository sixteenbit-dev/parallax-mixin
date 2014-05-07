module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compass
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'assets/css',
          imagesDir: 'assets/img',
          javascriptsDir: 'assets/js',
          fontsDir: 'assets/fonts',
          outputStyle: 'compact',
          relativeAssets: true,
          noLineComments: true,
          importPath: [
            'bower_components/bourbon/app/assets/stylesheets',
            'bower_components/foundation/scss'
          ]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      dist: {
        src: 'assets/css/style.css',
        dest: 'assets/css/style.css'
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'tmp/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/skrollr/src/skrollr.js'], dest: 'tmp/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/jquery-waypoints/waypoints.js'], dest: 'tmp/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/imagesloaded-packaged/imagesloaded.pkgd.js'], dest: 'tmp/js/', filter: 'isFile'}
        ]
      }
    },

    // Uglify
    uglify: {
      min: {
        files: {
          "assets/js/vendor/modernizr.min.js": ["tmp/js/modernizr.js"],
          "assets/js/skrollr.min.js": ["tmp/js/skrollr.js"],
          "assets/js/waypoints.min.js": ["tmp/js/waypoints.js"],
          "assets/js/imagesloaded.min.js": ["tmp/js/imagesloaded.pkgd.js"],
          "assets/js/main.js": ["src/js/_main.js"]
        }
      }
    },

    // Imagemin
    imagemin: {
      img: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: '**/*.{png,jpg,gif}',
          dest: 'assets/img/'
        }]
      },
      ico: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/ico/',
          src: '**/*.{png,jpg,gif}',
          dest: 'assets/ico/'
        }]
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['default']
      },
      markup: {
        files: ["*.php"],
      },
      compass: {
        files: ['scss/**/*'],
        tasks: ['stylesheets']
      }
    }
  });

  // register task
  grunt.registerTask('stylesheets', [
    'compass',
    'autoprefixer'
  ]);

  // register task
  grunt.registerTask('scripts', [
    'copy',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'stylesheets',
    'scripts',
    'watch'
  ]);
};