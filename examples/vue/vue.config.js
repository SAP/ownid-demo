 const path = require('path');

module.exports = {
  pluginOptions: {
    'vue-cli-plugin-auto-alias': {
      // rootDirName: 'src',
      'case': 'pascalCase',
      alias: {
        // just like a normal resolve in Webpack
        // test:path.resolve(__dirname,'test')
        components: path.resolve(__dirname, './src/components'),
        demos: path.resolve(__dirname, './src/components/demos'),
        views: path.resolve(__dirname, './src/components/views'),
        subviews: path.resolve(__dirname, './src/components/views/subviews'),
        layouts: path.resolve(__dirname, './src/components/layouts'),
        helpers: path.resolve(__dirname, './src/helpers'),
        controls: path.resolve(__dirname, './src/components/controls'),
        store: path.resolve(__dirname, 'src/store')
      }
    }
  }
}
