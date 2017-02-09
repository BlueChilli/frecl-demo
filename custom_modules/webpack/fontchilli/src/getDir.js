import fs from 'fs';
import path from 'path';

class processDir {
  constructor(data) {
    this.data = data;
  }

  getPaths() {
    let paths = [];
    this.data.map(frag => {
      paths.push(frag.path);
    });
    return paths;
  }

  getFilenames() {
    let filenames = [];
    this.data.map(frag => {
      filenames.push(frag.filename);
    });
    return filenames;
  }

}

export default (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const svgFiles = files.filter(filename => path.extname(`${dir}/${filename}`) === ".svg");

      resolve(new processDir(
        svgFiles.map(filename => {
          return {
            path: `${dir}/${filename}`,
            filename
          } 
        })
      ));
    });
  });
}
