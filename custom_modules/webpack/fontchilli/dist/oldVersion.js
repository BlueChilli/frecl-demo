'use strict';

var _getDir = require('./getDir');

var _getDir2 = _interopRequireDefault(_getDir);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webfontsGenerator = require('webfonts-generator');

var _webfontsGenerator2 = _interopRequireDefault(_webfontsGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Test Const

function defaults() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$fontName = _ref.fontName;
  var fontName = _ref$fontName === undefined ? 'iconfont' : _ref$fontName;
  var _ref$svgPath = _ref.svgPath;
  var svgPath = _ref$svgPath === undefined ? null : _ref$svgPath;
  var _ref$tmpLocation = _ref.tmpLocation;
  var tmpLocation = _ref$tmpLocation === undefined ? '/tmp' : _ref$tmpLocation;


  return {
    fontName: fontName,
    svgPath: svgPath,
    tmpLocation: tmpLocation
  };
}

var apply = function apply(ops, compiler) {

  var options = defaults(ops);

  compiler.plugin('emit', function (compilation, done) {
    (0, _getDir2.default)(options.svgPath).then(function (fileList) {
      return new Promise(function (resolve, reject) {
        (0, _webfontsGenerator2.default)({
          files: fileList.getPaths(),
          fontName: options.fontName,
          dest: options.tmpLocation,
          rename: function rename(iconPath) {
            var iconName = _path2.default.basename(iconPath);
            return iconName.replace(/\s+/g, '-').toLowerCase();
          }
        }, function (error, result) {
          if (error) {
            reject(error);
          } else {

            var assetStack = [[options.fontName + ".ttf", assetCreator(result.ttf)], [options.fontName + ".woff", assetCreator(result.woff)], [options.fontName + ".svg", assetCreator(result.svg)], [options.fontName + ".eot", assetCreator(result.eot)], [options.fontName + ".css", assetCreator(result.generateCss())]];

            assetStack.map(function (asset) {
              compilation.assets[asset[0]] = asset[1];
              compilation.fileDependencies.push(asset[0]);
            });

            resolve();
          }
        });
      });
    }).then(function () {
      done();
    });
  });
};

var assetCreator = function assetCreator(contents) {
  return {
    source: function source() {
      return contents;
    },
    size: function size() {
      return contents.length;
    }
  };
};

module.exports = function (options) {
  return {
    apply: apply.bind(this, options)
  };
};