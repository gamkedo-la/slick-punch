module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // cssmin: {
    //   build: {
    //     src: 'styles/main.css',
    //     dest: 'styles/main.min.css'
    //   }
    // },
    concat: {
      options: {
        separator: '\n/*next file*/\n\n'  //this will be put between conc. files
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dest/built.js'
      }
    },
    jshint: {
      beforeconcat: ['src/js/*.js'],
      afterconcat: ['dest/built.js'],
    },
    uglify: {
      build: {
        files: {
          'dest/built.min.js': ['dest/built.js']
        },
        options: {
          compress: false,
          beautify: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  //jshint is still buggy because of es6 issue. 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);

};