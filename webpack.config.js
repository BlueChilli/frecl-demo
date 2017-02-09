var path = require('path');
var webpack = require("webpack");
var config = require('config');
var autoprefixer = require('autoprefixer');
var fontChilli = require('./custom_modules/webpack/fontchilli/dist/index.js');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/dev-server',
    path.join(__dirname, '/app/entry.js')
  ],
  output: {
    path: '/',
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|custom_modules)/,
      loader: "babel-loader"
    }, {
      test: /\.(s?css)/,
      loader: "style-loader!css-loader!postcss-loader!sass-loader"
    },{
      test: /\.(jpe?g$|gif|png)$/i,
      loader: "url!img"
    }, {
      test: /\.md$/,
      loader: "html-loader!markdown-loader"
    }, {
      test: /\.(txt|json|svg)$/,
      loader: "raw-loader"
    }]
  },
  plugins: [
    new fontChilli({
      fontName: 'fontchilli',
      svgPath: 'app/Assets/svg'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process': {
        'env.NODE_ENV': JSON.stringify(config.util.getEnv('NODE_ENV'))
      },
      'API_URL': JSON.stringify(config.get('apiURL')),
      'BASE_URL': JSON.stringify(config.get('baseURL')),
      'BASE_NAME': JSON.stringify(config.get('baseName')),
      'API_KEY': JSON.stringify(config.get('apiKey')),
      'LOGIN_URL': JSON.stringify(config.get('loginURL')),
      'GA_TRACKING_CODE': JSON.stringify(config.get('ga_tracking_code'))
    }),
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => {
          return [autoprefixer]
        }
      }
    })
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", '.js', '.jsx', '.tsx', '.ts'],
    modules: ['custom_modules', 'node_modules'],
    alias: {
      'vanilla-masker': path.resolve(__dirname, 'custom_modules/vanilla-masker', 'vanilla-masker.js')
    }
  }
};
