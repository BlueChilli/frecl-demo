var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
var config = require('config');
var autoprefixer = require('autoprefixer');
var baseURL = config.get('baseURL');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

process.env.NODE_ENV = JSON.stringify(config.get('buildEnvironment'));

module.exports = {

  entry: "./app/entry.js",

  output: {
    path: "./build/",
    filename: "[name].js?q=[chunkhash]",
    chunkFilename: "[name].js?q=[chunkhash]",
    publicPath: baseURL + "/"
  },
  devtool: "source-map",
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|custom_modules)/,
      loader: "babel-loader"
    }, {
        test: /\.tsx?$/,
        exclude:  /(node_modules|custom_modules)/,
        loader: "awesome-typescript-loader"
    },
        {
      test: /\.(scss)/,
      loader: "style-loader!css-loader!postcss-loader!sass-loader"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(jpe?g$|gif|png)$/i,
      loader: "url-loader!img-loader"
    }, {
      test: /\.md$/,
      loader: "html-loader!markdown-loader"
    }, {
      test: /\.(txt|json|svg)$/,
      loader: "raw-loader"
    }]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'], {
      "verbose": true // Write logs to console.
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        dead_code: true,
        conditionals: true,
        drop_debugger: true
      },
      output: {comments: false}
    }),
    new webpack.DefinePlugin({
      'process': {
        'env.NODE_ENV': JSON.stringify(config.get('buildEnvironment')),
        'env.EXEC_ENV': JSON.stringify(config.get('executionEnvironment'))
      },
      'API_URL': JSON.stringify(config.get('apiURL')),
      'BASE_URL': JSON.stringify(config.get('baseURL')),
      'BASE_NAME': JSON.stringify(config.get('baseName')),
      'S3_PATH': JSON.stringify(config.get('s3Path')),
      'API_KEY': JSON.stringify(config.get('apiKey')),
      'LOGIN_URL': JSON.stringify(config.get('loginURL')),
      'RAYGUN_APIKEY': JSON.stringify(config.get('raygun')),
      'GA_TRACKING_CODE': JSON.stringify(config.get('ga_tracking_code')),
      'TITLE': JSON.stringify(config.get('title')),
      'HOST': JSON.stringify(config.get('host')),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: () => {
          return [autoprefixer]
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./app/index.prod.ejs",
      environment: config.get('executionEnvironment'),
      bugherd: config.get('bugherd'),
      heap: config.get('heap'),
      title: config.get('title'),
      mixpanel: config.get('mixpanel'),
      inject: 'body',
      favicon: "./app/favicon.ico"
    }),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    failPlugin,
    new CheckerPlugin()
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", '.js', '.jsx', '.tsx', '.ts', ''],
    modules: ['custom_modules', 'node_modules'],
    alias: {
      'vanilla-masker': path.resolve(__dirname, 'custom_modules/vanilla-masker', 'vanilla-masker.js')
    }
  }

};
