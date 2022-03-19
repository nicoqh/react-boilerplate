// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, "./src");
const PATH_DIST = path.join(__dirname, "./dist");

// If we export a function, it will be passed two parameters, the first
// of which is the webpack command line environment option `--env`.
// `webpack --env.a = b` sets env.a = 'b'
// `webpack --env.production` sets env.production = true
// https://webpack.js.org/configuration/configuration-types/#exporting-a-function
module.exports = (env) => {
  const environment = env.environment;
  const isProduction = environment === "production";
  const isDevelopment = environment === "development";

  return {
    // Tell Webpack to do some optimizations for our environment (development
    // or production). Webpack will enable certain plugins and set
    // `process.env.NODE_ENV` according to the environment we specify.
    // https://webpack.js.org/configuration/mode
    mode: environment,

    // Configuration options for Webpack DevServer, an Express web server that
    // aids with development and provides live reloading out of the box.
    devServer: {
      static: {
        // The dev server will serve content from this directory.
        directory: PATH_DIST,
      },

      // Specify a host and port number.
      host: "localhost",
      port: 8080,

      // When using the HTML5 History API (you'll probably do this with React
      // later), index.html should be served in place of 404 responses.
      historyApiFallback: true,

      client: {
        // Show a full-screen overlay in the browser when there are compiler
        // errors or warnings.
        overlay: {
          errors: true,
          warnings: true,
        },
      },
    },

    // The point or points to enter the application. This is where Webpack will
    // start. We generally have one entry point per HTML page. For single-page
    // applications, this means one entry point. For traditional multi-page apps,
    // we may have multiple entry points.
    // https://webpack.js.org/concepts#entry
    entry: [path.join(PATH_SOURCE, "./index.js")],

    // Tell Webpack where to emit the bundles it creates and how to name them.
    // https://webpack.js.org/concepts#output
    // https://webpack.js.org/configuration/output
    // https://webpack.js.org/configuration/output#outputFilename
    output: {
      path: PATH_DIST,
      filename: "js/[name].[contenthash].js",

      // The public URL of the output dir when referenced in a browser.
      // This value is prefixed to every URL created by the runtime or loaders.
      // It's empty by default, which creates URLs like 'bundle.js' and results
      // in 404s if they're requested from a nested URL like /articles/1
      // https://webpack.js.org/configuration/output/#outputpublicpath
      publicPath: "/",
    },

    // Determine how the different types of modules will be treated.
    // https://webpack.js.org/configuration/module
    // https://webpack.js.org/concepts#loaders
    module: {
      rules: [
        {
          test: /\.js$/, // Apply this rule to files ending in .js
          exclude: /node_modules/, // Don't apply to files residing in node_modules
          use: {
            // Use the following loader and options
            loader: "babel-loader",
            // We can pass options to both babel-loader and Babel. This option object
            // will replace babel.config.js
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true, // Output the targets/plugins used when compiling

                    // Configure how @babel/preset-env handles polyfills from core-js.
                    // https://babeljs.io/docs/en/babel-preset-env
                    useBuiltIns: "usage",

                    // Specify the core-js version. Must match the version in package.json
                    corejs: 3,

                    // Specify which environments we support/target for our project.
                    // (We have chosen to specify targets in .browserslistrc, so there
                    // is no need to do it here.)
                    // targets: "",
                  },
                ],
                // The react preset includes plugins that are required for React
                // apps. For example, it inclues a plugin that transforms JSX.
                [
                  "@babel/preset-react",
                  {
                    // Tell "plugin-transform-react-jsx" which runtime to use.
                    // The "automatic" runtime will:
                    // * Import the jsx() function in your JSX files:
                    //   `import { jsx as _jsx } from "react";`
                    // * Transform JSX: `<div />` to `_jsx("div")`
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      // This plugin will generate an HTML5 file that imports all our Webpack
      // bundles using <script> tags. The file will be placed in `output.path`.
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, "./index.html"),
      }),

      // This plugin will delete all files inside `output.path` (the dist directory),
      // but the directory itself will be kept.
      // https://github.com/johnagan/clean-webpack-plugin
      new CleanWebpackPlugin(),
    ],
  };
};
