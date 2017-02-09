var path = require('path');
var webpack = require("webpack");
var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('config');
var autoprefixer = require('autoprefixer');
var baseURL = config.get('baseURL');
var failPlugin = require('webpack-fail-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

process.env.NODE_ENV = JSON.stringify(config.get('buildEnvironment'));

var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var commonLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|custom_modules)/,
    loader: "babel"

  },
    {
        test: /\.tsx?$/,
        exclude:  /(node_modules|custom_modules)/,
        loader: "awesome-typescript-loader"
    },
  {
    test: /\.s?css/,
    loader: ExtractTextPlugin.extract("css!postcss!sass")
  },
    { test: /\.json$/, loader: "json-loader"},
  {
    test: /\.md$/,
    loader: "html!markdown"
  }, {
    test: /\.(txt|svg)/,
    loader: "raw"
  }, {
    test: /\.(jpe?g|png|gif)$/i,
    loader: "url",
    query: {
      name: "images/[hash].[ext]",
      limit: 8192
    }
  }
];


var commonPlugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process': {
      'env.NODE_ENV': JSON.stringify(config.get('buildEnvironment')),
      'env.EXEC_ENV': JSON.stringify(config.get('executionEnvironment'))
    },
    'API_URL': JSON.stringify(config.get('apiURL')),
    'BASE_URL': JSON.stringify(config.get('baseURL')),
    'S3_PATH': JSON.stringify(config.get('s3Path')),
    'API_KEY': JSON.stringify(config.get('apiKey')),
    'LOGIN_URL': JSON.stringify(config.get('loginURL')),
    'RAYGUN_APIKEY': JSON.stringify(config.get('raygun')),
    'GA_TRACKING_CODE': JSON.stringify(config.get('ga_tracking_code')),
    'TITLE': JSON.stringify(config.get('title')),
    'HOST': JSON.stringify(config.get('host')),
  }),
  new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      dead_code: true,
      conditionals: true,
      warnings: false,
      drop_debugger: true
    },
    output: {comments: false}
  }),
  failPlugin,
  new CheckerPlugin()
];


var clientPlugins = [
  new CleanWebpackPlugin(['build/*'], {
    "verbose": true // Write logs to console.
  }),
  new ExtractTextPlugin("main.css"),
  new HtmlWebpackPlugin({
    template: "./app/index.prod.server.ejs",
    inject: 'body',
    environment: config.get('executionEnvironment'),
    bugherd: config.get('bugherd'),
    heap: config.get('heap'),
    title: config.get('title'),
    mixpanel: config.get('mixpanel'),
    favicon: "./app/favicon.ico",
    filename: 'index-server.html'
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
  })
].concat(commonPlugins);

var commonResolve =  {
    extensions: [".webpack.js", ".web.js", '.js', '.jsx', '.tsx', '.ts', ".json",''],
    modulesDirectories: ['custom_modules', 'node_modules'],
    alias: {
        'vanilla-masker': path.resolve(__dirname, 'custom_modules/vanilla-masker', 'vanilla-masker.js')
    }
};

var postCss = function () {
    return [autoprefixer];
}

var clientConfig = {

  entry: "./app/entry.js",
  output: {
    path: "./build/",
    filename: "[name].js?q=[chunkhash]",
    chunkFilename: "[name].js?q=[chunkhash]",
    publicPath: baseURL + "/"
  },
  devtool: "source-map",
  module: {
    loaders: commonLoaders
  },
  postcss: postCss,
  plugins: clientPlugins,
  resolve: commonResolve
}

var serverPlugins = [
  new CleanWebpackPlugin(['build/server-*'], {
    "verbose": true // Write logs to console.
  }),
  new ExtractTextPlugin("styles.css")

].concat(commonPlugins);


var serverConfig = {
  // The configuration for the server-side rendering
  name: "server-side rendering",
  entry: {
    "server-matcher": "./app/server/matcher.js",
    'server-renderer': './app/server/renderer.js'
  },
  target: "node",
  output: {
    path: "./build/",
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  externals: nodeModules,
  module: {
    loaders: commonLoaders
  },
  postcss: postCss,
  plugins: serverPlugins,
  resolve: commonResolve
};

module.exports = [
  clientConfig,
  serverConfig
];
