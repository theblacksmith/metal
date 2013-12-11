/**
 * Utility functions to make configuring grunt easier.
 */

/**
 * A utility function to get all app JavaScript sources.
 */
function filterForJS ( files ) {
  return files.filter( function ( file ) {
    return file.match( /\.js$/ );
  });
}

/**
 * A utility function to get all app CSS sources.
 */
function filterForCSS ( files ) {
  return files.filter( function ( file ) {
    return file.match( /\.css$/ );
  });
}

/**
 * A utility function to load task configuration from a directory
 */
function readTasksConfig(path, grunt)
{
  var tasksConfig = {};
  
  require('fs')
    // get a list of files inside config/tasks
    .readdirSync(path)
    // filter selecting only those which end with .js
    .filter(function(fileName){ return (/.js$/).test(fileName); })
    // for each file we found
    .forEach(function (task) {
      // let the user know we are loading it
      grunt.log.writeln("Loading task config from " + task);

      var taskDef = require('../config/tasks/' + task);

      if(typeof taskDef == "function")
        taskDef = taskDef(grunt);

      tasksConfig[task.replace(/\.js$/, '')] = taskDef;
    });

  return tasksConfig;
}

// allow using this file directly OR as a module
module = module || {};
module.exports = module.exports || {};

module.exports = {
  filterForJS: filterForJS,
  filterForCSS: filterForCSS,
  readTasksConfig: readTasksConfig
};