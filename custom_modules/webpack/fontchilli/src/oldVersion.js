import getDir from './getDir';
import path from 'path';
import webfontsGenerator from 'webfonts-generator';

// Test Const


function defaults({
  fontName = 'iconfont',
  svgPath = null,
  tmpLocation = '/tmp',

} = {}) {

  return {
    fontName,
    svgPath,
    tmpLocation
  }
}


const apply = (ops, compiler) => {

  const options = defaults(ops);

  compiler.plugin('emit', (compilation, done) => {
    getDir(options.svgPath).then((fileList)=> {
      return new Promise((resolve, reject) => {
        webfontsGenerator({
          files: fileList.getPaths(),
          fontName: options.fontName,
          dest: options.tmpLocation,
          rename: (iconPath)=> {
            const iconName = path.basename(iconPath);
            return iconName.replace(/\s+/g, '-').toLowerCase();
          }
        }, function (error, result) {
          if (error) {
            reject(error);
          } else {


            const assetStack = [
              [options.fontName + ".ttf", assetCreator(result.ttf)],
              [options.fontName + ".woff", assetCreator(result.woff)],
              [options.fontName + ".svg", assetCreator(result.svg)],
              [options.fontName + ".eot", assetCreator(result.eot)],
              [options.fontName + ".css", assetCreator(result.generateCss())]
            ];

            assetStack.map(asset => {
              compilation.assets[asset[0]] = asset[1];
              compilation.fileDependencies.push(asset[0]);
            });

            resolve();
          }
        });
      });

    }).then(()=> {
      done();
    });
  });
};

const assetCreator = contents => ({

  source() {
    return contents;
  },

  size() {
    return contents.length;
  }
});


module.exports = function (options) {
  return {
    apply: apply.bind(this, options)
  };
};