import getDir from './getDir';
import path from 'path';
import webfontsGenerator from 'webfonts-generator';
import MultiEntryDependency from '../../../../node_modules/webpack/lib/dependencies/MultiEntryDependency';
import SingleEntryDependency from '../../../../node_modules/webpack/lib/dependencies/SingleEntryDependency';
import ModuleDependency from '../../../../node_modules/webpack/lib/dependencies/ModuleDependency';

import fs from 'fs';
//import MultiModuleFactory from 'webpack/lib/MultiModuleFactory';


function defaults({
  fontName = 'iconfont',
  svgPath = null,
  tmpLocation = '/tmp',
  cssTemplate =  __dirname + '/cssTemplate.hbs'
} = {}) {
  return {
    fontName,
    svgPath,
    tmpLocation,
    cssTemplate
  }
}


const apply = (ops, compiler) => {

  const options = defaults(ops);

  const assetStack = [
    options.fontName + ".ttf",
    options.fontName + ".woff",
    options.fontName + ".eot",
    options.fontName + ".css"
  ];


  options.tmpLocation = path.relative(".", options.tmpLocation);


  compiler.plugin('make', (compilation, done) => {

    options.tmpLocation = path.join(path.resolve(options.svgPath), options.fontName);

    getDir(options.svgPath).then((fileList)=> {
      return new Promise((resolve, reject) => {
        webfontsGenerator({
          files: fileList.getPaths(),
          fontName: options.fontName,
          dest: options.tmpLocation,

          rename: (iconPath)=> {
            const iconName = path.basename(iconPath, ".svg");
            return iconName.replace(/\s+/g, '-').toLowerCase();
          },
          cssTemplate: options.cssTemplate
        }, function (error, result) {
          if (error) {
            reject(error);
          } else {

            // Adjust CSS file to have paths that webpack can read
            let contents = fs.readFileSync(path.join(options.tmpLocation, options.fontName + ".css"), 'utf8').toString();
            const quotedStuff = contents.match(/".*?"/g);

            quotedStuff.map((frag)=> {
              frag = frag.replace(/\"/g, "");
              var t = frag.replace(/\?.*/, "");
              if (t != frag) {
                contents = contents.replace(frag, "~./" + t); // path.join(options.tmpLocation, t)
              }

            });

            fs.writeFileSync(path.join(options.tmpLocation, options.fontName + ".css"), contents);

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
          }
        });
      }).catch((error)=> {
        console.log(error);
        compilation.errors.push("FontChilli. " + error.toString());
      });
    });
  });


  compiler.plugin('emit', function (compilation, callback) {
    // Remove all fonts from watchlist
    compilation.fileDependencies = compilation.fileDependencies.filter(fileName => {
      //if (assetStack.indexOf(path.basename(fileName)) !== -1) {
      //  console.log("Removing " + fileName);
      //}

      return (assetStack.indexOf(path.basename(fileName)) === -1);
    });

    callback();
  });


};

module.exports = function (options) {
  return {
    apply: apply.bind(this, options)
  };
};