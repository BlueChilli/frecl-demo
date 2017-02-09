'use strict';

var _getDir = require('./getDir');

var _getDir2 = _interopRequireDefault(_getDir);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webfontsGenerator = require('webfonts-generator');

var _webfontsGenerator2 = _interopRequireDefault(_webfontsGenerator);

var _MultiEntryDependency = require('../../../../node_modules/webpack/lib/dependencies/MultiEntryDependency');

var _MultiEntryDependency2 = _interopRequireDefault(_MultiEntryDependency);

var _SingleEntryDependency = require('../../../../node_modules/webpack/lib/dependencies/SingleEntryDependency');

var _SingleEntryDependency2 = _interopRequireDefault(_SingleEntryDependency);

var _ModuleDependency = require('../../../../node_modules/webpack/lib/dependencies/ModuleDependency');

var _ModuleDependency2 = _interopRequireDefault(_ModuleDependency);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import MultiModuleFactory from 'webpack/lib/MultiModuleFactory';

function defaults() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$fontName = _ref.fontName;
  var fontName = _ref$fontName === undefined ? 'iconfont' : _ref$fontName;
  var _ref$svgPath = _ref.svgPath;
  var svgPath = _ref$svgPath === undefined ? null : _ref$svgPath;
  var _ref$tmpLocation = _ref.tmpLocation;
  var tmpLocation = _ref$tmpLocation === undefined ? '/tmp' : _ref$tmpLocation;
  var _ref$cssTemplate = _ref.cssTemplate;
  var cssTemplate = _ref$cssTemplate === undefined ? __dirname + '/cssTemplate.hbs' : _ref$cssTemplate;

  return {
    fontName: fontName,
    svgPath: svgPath,
    tmpLocation: tmpLocation,
    cssTemplate: cssTemplate
  };
}

var apply = function apply(ops, compiler) {

  var options = defaults(ops);

  var assetStack = [options.fontName + ".ttf", options.fontName + ".woff", options.fontName + ".eot", options.fontName + ".css"];

  options.tmpLocation = _path2.default.relative(".", options.tmpLocation);

  compiler.plugin('make', function (compilation, done) {

    options.tmpLocation = _path2.default.join(_path2.default.resolve(options.svgPath), options.fontName);

    (0, _getDir2.default)(options.svgPath).then(function (fileList) {
      return new Promise(function (resolve, reject) {
        (0, _webfontsGenerator2.default)({
          files: fileList.getPaths(),
          fontName: options.fontName,
          dest: options.tmpLocation,

          rename: function rename(iconPath) {
            var iconName = _path2.default.basename(iconPath, ".svg");
            return iconName.replace(/\s+/g, '-').toLowerCase();
          },
          cssTemplate: options.cssTemplate
        }, function (error, result) {
          if (error) {
            reject(error);
          } else {
            (function () {

              // Adjust CSS file to have paths that webpack can read
              var contents = _fs2.default.readFileSync(_path2.default.join(options.tmpLocation, options.fontName + ".css"), 'utf8').toString();
              var quotedStuff = contents.match(/".*?"/g);

              quotedStuff.map(function (frag) {
                frag = frag.replace(/\"/g, "");
                var t = frag.replace(/\?.*/, "");
                if (t != frag) {
                  contents = contents.replace(frag, "~./" + t); // path.join(options.tmpLocation, t)
                }
              });

              _fs2.default.writeFileSync(_path2.default.join(options.tmpLocation, options.fontName + ".css"), contents);

              done();
              /**
               TODO: After this it would be nice to insert the css dependency manually.
               Below is a failed attempt. Feel free to fix. (hint. May have to use a child compiler)
               */

              //const deps = assetStack.map((fileName, idx) => {
              //  return new SingleEntryDependency(path.join(options.tmpLocation, fileName));
              /// });

              //compilation.addEntry(compiler.context, new MultiEntryDependency(deps), 'iconfont', done);
              //compilation.addEntry(compiler.context, new SingleEntryDependency(path.join(options.tmpLocation, options.fontName + ".css")), 'main', done);
              //compilation.prefetch(compiler.context, new SingleEntryDependency(path.join(options.tmpLocation, options.fontName + ".css")), done);

              //resolve();
            })();
          }
        });
      }).catch(function (error) {
        console.log(error);
        compilation.errors.push("FontChilli. " + error.toString());
      });
    });
  });

  compiler.plugin('emit', function (compilation, callback) {
    // Remove all fonts from watchlist
    compilation.fileDependencies = compilation.fileDependencies.filter(function (fileName) {
      //if (assetStack.indexOf(path.basename(fileName)) !== -1) {
      //  console.log("Removing " + fileName);
      //}

      return assetStack.indexOf(_path2.default.basename(fileName)) === -1;
    });

    callback();
  });
};

module.exports = function (options) {
  return {
    apply: apply.bind(this, options)
  };
};