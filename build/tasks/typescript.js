/**
 * The `ts` task configures typescript compilation
 */
module.exports = function(grunt) {

  var exports = {};

  // use to override the default options, http://gruntjs.com/configuring-tasks#options
  exports.options = { 
    // es3 (default) / or es5
    target: 'es5',

    // amd , commonjs (default)
    module: 'commonjs',

    // true (default) | false
    sourcemap: true, 

    // true | false (default)
    declaration: false,

    // true | false (default)
    nolib: true, 

    // true | false (default)
    comments: false
  };

  exports.build = {
    // The source typescript files, http://gruntjs.com/configuring-tasks#files
    src: ["src/app/*.ts", "src/app/**/*.ts", "!src/app/typings/**"],

    // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
    html: ["src/app/**/*.tpl.html"], 
    
    // If specified, generate this file that you can use for your reference management
    reference: "src/app/_all.ts",
    
    // If specified, generate an out.js file which is the merged js file
    //out: 'assets/js/app.js',
    
    // Only works if out is not specified. If specified, the generate javascript files are placed here.
    outDir: '<%= build_dir %>/assets/js/',    
    amdloader: "<%= build_dir %>/assets/js/amdloader.js",
    // If specified, watches this directory for changes, and re-runs the current target
    // watch: 'src/app',

    // use to override the default options, http://gruntjs.com/configuring-tasks#options
    options: {
        // true | false  (default)
        declaration: false,

        // true | false (default)
        comments: true
    },
  };

  exports.tmp = {
    // The source typescript files, http://gruntjs.com/configuring-tasks#files
    src: ["<%= build_dir %>/tmp/**/*.ts"],

    // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
    //html: ["src/app/projects/**/*.tpl.html"], 
    
    // If specified, generate this file that you can use for your reference management
    reference: "src/app/_all.ts",
    
    // If specified, generate an out.js file which is the merged js file
    //out: 'assets/js/projects/module.js',
    
    // Only works if out is not specified. If specified, the generate javascript files are placed here.
    outDir: '<%= build_dir %>/tmp/assets/js/',    
    //amdloader: "<%= build_dir %>/assets/js/amdloader.js",
    // If specified, watches this directory for changes, and re-runs the current target
    // watch: 'src/app',

    // use to override the default options, http://gruntjs.com/configuring-tasks#options
    options: {
        // true | false  (default)
        declaration: false,

        // true | false (default)
        comments: true
    },
  };

  exports.module = {
    // The source typescript files, http://gruntjs.com/configuring-tasks#files
    src: ["src/app/modules/projects/module.ts"],

    // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
    //html: ["src/app/projects/**/*.tpl.html"], 
    
    // If specified, generate this file that you can use for your reference management
    reference: "src/app/_all.ts",
    
    // If specified, generate an out.js file which is the merged js file
    out: '<%= build_dir %>/tmp/sparrow.projects.js',
    
    // Only works if out is not specified. If specified, the generate javascript files are placed here.
    //outDir: '<%= build_dir %>/tmp/assets/js/',
    //amdloader: "<%= build_dir %>/assets/js/amdloader.js",
    // If specified, watches this directory for changes, and re-runs the current target
    // watch: 'src/app',

    // use to override the default options, http://gruntjs.com/configuring-tasks#options
    options: {
        // true | false  (default)
        declaration: false,

        // true | false (default)
        comments: true
    },
  };

  exports.compile = {
    // The source typescript files, http://gruntjs.com/configuring-tasks#files
    src: ["src/app/scripts/**/*.ts", "!src/app/scripts/typings/**"],

    // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
    html: ["src/app/**/*.tpl.html"], 

    // If specified, generate an out.js file which is the merged js file
    out: 'assets/js/app.js',

    // overide the main options for this target
    options: {
        sourcemap: false,
    }
  };

  grunt.renameTask('ts', 'typescript');

  return exports;
}