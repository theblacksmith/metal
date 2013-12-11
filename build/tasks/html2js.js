/**
 * HTML2JS is a Grunt plugin that takes all of your template files and
 * places them into JavaScript files as strings that are added to
 * AngularJS's template cache. This means that the templates too become
 * part of the initial payload as one JavaScript file. Neat!
 */

/**
 * These are the templates from `src/app`.
 */
exports.app = {
  options: {
    base: 'src/app'
  },
  src: [ '<%= app_files.atpl %>' ],
  dest: '<%= build_dir %>/templates-app.js'
};

/**
 * These are the templates from `src/common`.
 */
exports.common = {
  options: {
    base: 'src/common'
  },
  src: [ '<%= app_files.ctpl %>' ],
  dest: '<%= build_dir %>/templates-common.js'
};