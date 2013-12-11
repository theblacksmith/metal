/**
 *
 */
module.exports = function(grunt) {

  var config = {

    // Where to look for targets
    // it's recommended to use an absolute path, 
    // if you choose to use a realtive path remember it's relative to `linksPath`
    basePath: '<%= root %>/components',

    // where to save the link
    linksPath: "src/sass/components",

    mappings: {
      // maps in the form
      // link : target
      bootstrap: "sass-bootstrap/lib",
      "semantic-grid.scss": "semantic-grid/stylesheets/scss/grid.scss"
    }
  };

  grunt.registerTask("map-components", 
    "Creates links to components to make them easier to import from sass", function(){

    this.requiresConfig(this.name + ".mappings", this.name + ".linksPath");

    var path = require('path');

    var symlink = {
      options: {
        overwrite: true,
        force: true
      }
    };

    var config = grunt.config(this.name);

    var basePath = config.basePath || path.resolve(".");

    var mappings = config.mappings;
    
    grunt.verbose.writeflags(config, 'Config');
    
    grunt.log.writeln("Mapping components...");

    for(var component in mappings) {
      var target = path.resolve(config.basePath + "/" + mappings[component]);
      
      grunt.log.write(component.yellow + " >> ".green + target.cyan + "...");

      if (!grunt.file.exists(target)) {
        grunt.log.writeln();
        grunt.log.error('The target "' + target + '" was not found.');
      }
      else
      {
        symlink[component] = {
          target: target,
          link: config.linksPath + "/" + component
        };

        grunt.log.ok();
      }
    }
    
    if(this.errorCount > 0) {
      grunt.fail.warn('Some components have invalid mappings. \n\n TIP: Fix the map-components configuration at config/tasks/map-components.js', grunt.fail.code.TASK_FAILURE);
      return false;
    }

    grunt.verbose.writeln("Generated symlink config: " + JSON.stringify(symlink));
    grunt.config("symlink", symlink);
    grunt.task.run("symlink");
  });

  return config;
}