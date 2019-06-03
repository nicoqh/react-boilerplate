const path = require('path');

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

// Export a configuration object
module.exports = {
  // Tell Webpack to do some optimizations for our environment (development
  // or production). Webpack will enable certain plugins and set
  // `process.env.NODE_ENV` according to the environment we specify.
  // https://webpack.js.org/configuration/mode
  mode: 'development',

  // The point or points to enter the application. This is where Webpack will
  // start. We generally have one entry point per HTML page. For single-page
  // applications, this means one entry point. For traditional multi-page apps,
  // we may have multiple entry points.
  // https://webpack.js.org/concepts#entry
  entry: [
    path.join(PATH_SOURCE, './index.js'),
  ],

  // Tell Webpack where to emit the bundles it creates and how to name them.
  // https://webpack.js.org/concepts#output
  // https://webpack.js.org/configuration/output#output-filename
  output: {
    path: PATH_DIST,
    filename: 'js/[name].[hash].js',
  },
};
