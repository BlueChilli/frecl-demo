'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var processDir = function () {
  function processDir(data) {
    _classCallCheck(this, processDir);

    this.data = data;
  }

  _createClass(processDir, [{
    key: 'getPaths',
    value: function getPaths() {
      var paths = [];
      this.data.map(function (frag) {
        paths.push(frag.path);
      });
      return paths;
    }
  }, {
    key: 'getFilenames',
    value: function getFilenames() {
      var filenames = [];
      this.data.map(function (frag) {
        filenames.push(frag.filename);
      });
      return filenames;
    }
  }]);

  return processDir;
}();

exports.default = function (dir) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readdir(dir, function (err, files) {
      if (err) {
        reject(err);
        return;
      }

      var svgFiles = files.filter(function (filename) {
        return _path2.default.extname(dir + '/' + filename) === ".svg";
      });

      resolve(new processDir(svgFiles.map(function (filename) {
        return {
          path: dir + '/' + filename,
          filename: filename
        };
      })));
    });
  });
};