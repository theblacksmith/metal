/**
 * Minify the sources!
 */
exports.compile = 
{
  options: {
    banner: '<%= meta.banner %>'
  },

  files: {
    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
  }
};