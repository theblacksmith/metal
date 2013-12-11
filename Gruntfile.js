/*****************************************************************
 ** The Amazing Gruntfile
 ** 
 ** This file configures `grunt` to build our beautiful project :)
 ** To learn more about the grunt tool check docs/tools.md
 ** 
 ** Main tasks
 ** 
 ** dev
 **
 **   This is the task you want run if you are developing the frontend.
 **   It combines build, karma and watch tasks. So open up a terminal,
 **   run it and start coding. As you make changes it will automatically
 **   refresh your browser.
 ** 
 ** build
 ** 
 **   Builds the site in a development friendly way.
 **   You usually won't call this tasks directly.
 ** 
 ** compile
 ** 
 **   It compiles our project for deployment. Everything is minimized, uglifyied
 **   and ultimatelly optimized for debug.
 ** 
 ** publish
 ** 
 **   target: build
 **     Copies the `build` result to the legacy UI app
 **
 **   target: compilation
 **     Copies the `compile` result to the legacy UI app
 ** 
 ** @TODO:
 ** 
 ** - Typescript task
 ** - Livereload task
 ** - cdnify (automatically replaces scripts and styles by cdn versions)
 ** - autoprefixer? (automatically adds vendor specific prefixes to css)
 ** 
 *****************************************************************/

var helpers = require('./config/helpers.js');

module.exports = function ( grunt ) {

  /** 
   * Load all installed Grunt tasks which follows
   */
  require('load-grunt-tasks')(grunt);

  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './config/build.config.js' );

  /**
   * Load tasks config from config/tasks directory
   */
  var tasksConfig = helpers.readTasksConfig('./config/tasks', grunt);

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var gruntConfig = {

    /**
     * The banner is the comment that is placed at the top of our compiled 
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: { banner: grunt.file.read('config/banner.tpl') },

    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * Creates a changelog on a new version.
     */
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        template: 'config/changelog.tpl'
      }
    },

    /**
     * The directories to delete when `grunt clean` is executed.
     */
    clean: [ 
      '<%= build_dir %>', 
      '<%= compile_dir %>',
      // obj is the name of the variable which holds the config inside a template
      '<%= obj["map-components"].linksPath %>/*'
    ],
  };

  gruntConfig = grunt.util._.extend( tasksConfig, gruntConfig );

  grunt.initConfig( grunt.util._.extend( gruntConfig, userConfig ) );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    // clean up
    'clean', 
    // cache html templates
    'html2js',
    // check for issues
    'jshint',
    // Map components 
    'map-components',
    // concatenate css
    'compass',
    // copy assets and components 
    'copy:build_app_assets', 
    'copy:build_vendor_assets',
    'copy:build_appjs', 
    'copy:build_vendorjs', 
    // build our index
    'index:build', 
    // append new scripts to karma config
    'config-karma',
    // run karma tests continuously
    'karma:continuous' 
  ]);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'copy:compile_assets',
    'ngmin',
    'concat:compile_js',
    'uglify',
    'index:compile'
  ]);

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.registerTask( 'dev', [ 'build', 'karma:unit', 'watch' ] );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build', 'compile' ] );

  grunt.registerTask('publish', function(target) {
    grunt.error.writeln("Not impelemented yet")
  });
};