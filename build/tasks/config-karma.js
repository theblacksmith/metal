/**
 * In order to avoid having to specify manually the files needed for karma to
 * run, we use grunt to manage the list for us. The `config/karma/karma-unit.tpl.js` 
 * file is compiled as grunt template to be later used by Karma. Yay!
 */

var helpers = require('../helpers.js');

module.exports = function(grunt) {

  /**
   * This task compiles the karma template so that changes 
   * to its file array don't have to be managed manually.
   */
  var exports = {
    unit: {
      dir: '<%= build_dir %>',
      src: [ 
        '<%= vendor_files.js %>',
        '<%= html2js.app.dest %>',
        '<%= html2js.common.dest %>',
        '<%= test_files.js %>'
      ]
    }
  };

  // register task with grunt
  grunt.registerMultiTask( 'config-karma', 'Automatically configures karma', function () {
    var jsFiles = helpers.filterForJS( this.filesSrc );
    
    grunt.file.copy( 'config/karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });

  return exports;
}