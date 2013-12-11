/**
 * Combines typescript files on a per folder basis
 */
 
 module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');

  var exports = {
    options: {
      prefix: 'sparrow.'  
    },

    modules: {
      src: ['src/app/modules/*'],
      dest: '<%= build_dir %>/tmp'
    },
    
    common: {
      src: ['src/app/*', '!src/app/modules', '!src/app/typings'],
      dest: '<%= build_dir %>/tmp',
      options: {
        prefix: ''
      }
    },
    // todo: implement a 'deep' property which can be 
    // set to true to combine the inner most dirs or false to combine to the outer dirs 
  };

  var updateReferences = function(src, origPath, newPath) {
    var remove = /\/\/\/\s*<reference\s*path=['"]\w+[^'"]*['"]\s*\/>/;
    var replace = "/// <reference path='";
    var relative = path.relative(newPath, origPath);
    
    grunt.log.writeln("Injecting relative: " + relative);



    return src
            .replace(remove, '')
            .replace(replace, replace + relative + '/');
  }

  var combineDir = function (dir, dest, options) {
    var name = path.basename(dir);

    var concatConf = {
      src: dir + '/**/*.ts',
      dest: path.join(dest, name+'.ts'),
      options: { 
        process: function(src, filepath) {
          grunt.log.writeln("Process: " + filepath);
          return updateReferences(src, path.dirname(filepath), dest);
        }
      }
    };

    grunt.log.writeln(JSON.stringify(concatConf));
    grunt.config('concat.combine_' + name, concatConf);

    grunt.task.run('concat:combine_'+name);
  };

  grunt.registerMultiTask('combine', 'Combines typescript files on a per folder basis', function(target) {
        
    var options = this.options({
      prefix: ""
    });

    this.files.forEach(function(dir) {

      var dest = dir.dest;

      var list = dir.src.filter(function(path) {
        return (grunt.file.exists(path) && grunt.file.isDir(path))
      });

      if (!list.length) {
        grunt.log.writeln("No files to combine in " + dir);
        return;
      }

      list.forEach(function(entry) {

        if (fs.statSync(entry).isDirectory()) {
            combineDir(entry, dest);
        }
      });
    });
  });

  return exports;
 };