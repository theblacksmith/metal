/**
 * Configures compass to run 
 */

module.exports = {
  options: {
    //config: 'config/compass.rb',
    require: [
      'compass-import_once'
    ],

    // The kind of app compass is compiling (stand_alone | rails) 
    app: 'stand_alone',

    // where to look for @import'ed files
    importPath: [
      '/projects/Jack/Sparrow/source/Web.UI/src/sass/components/'
    ],

    basePath: '/projects/Jack/Sparrow/source/Web.UI/',

    // where is the app?
    //httpPath: '/',

    // directories
    sassDir: 'src/sass',
    fontsDir: 'src/assets/fonts',
    imagesDir: 'src/assets/img',
    javascriptsDir: 'src/assets/js',

    generatedImagesDir: 'src/assets/img/generated',
    // http paths
    httpImagesPath: '/assets/img',
    httpGeneratedImagesPath: '/assets/img/generated',
    httpFontsPath: '/assets/fonts',

    relativeAssets: false
  },

  build: {
    options: {
      // directories
      cssDir: '<%= build_dir %>/assets/css',

      environment: 'development',
      relativeAssets: true,
      debugInfo: true
    }
  },

  compile: {
    options: {
      cssDir: '<%= compile_dir %>/assets/css',
      environment: 'production'
    }
  },

  "map-components": {
    "semantic-grid": "components/semantic-grid/stylesheets/scss",
    "bootstrap": "components/sass-bootstrap/lib"
  }
}