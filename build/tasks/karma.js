/**
 * The Karma configurations.
 */
module.exports = {
  options: {
    configFile: '<%= build_dir %>/karma-unit.js'
  },
  unit: {
    runnerPort: 9101,
    background: true
  },
  continuous: {
    singleRun: true,
    browsers: ['PhantomJS']
  }
};