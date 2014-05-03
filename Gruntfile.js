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

  grunt.registerTask('default', [
    'stylesheets',
    'watch'
  ]);
};