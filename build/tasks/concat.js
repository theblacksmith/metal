/**
 * `grunt concat` 
 * concatenates multiple source files into a single file.
 */

/**
 * The `compile_js` target is the concatenation of our application source
 * code and all specified vendor source code into a single file.
 */
exports.compile_js = {
  options: {
    banner: '<%= meta.banner %>'
  },
  src: [ 
    '<%= vendor_files.js %>', 
    'config/module.prefix', 
    '<%= build_dir %>/src/**/*.js', 
    '<%= html2js.app.dest %>', 
    '<%= html2js.common.dest %>', 
    'config/module.suffix' 
  ],
  dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
};