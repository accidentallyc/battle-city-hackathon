module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'assets/game.levels.js',
          'assets/levels/*.js',
          'assets/class/**/*.js',
          'assets/main.js',
        ],
        dest: 'build.js',
      },
    },
    watch: {
      files: ['assets/**/*.js','assets/*.js'],
      tasks: ['concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

};