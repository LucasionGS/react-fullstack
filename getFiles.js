const Path = require("path");
const fs = require("fs");

/**
 * @param {string} dir
 * @param {RegExp} test
 * @returns {string[]}
 */
function getFiles(dir, test) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = Path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();

    if (isDirectory) {
      return [...files, ...getFiles(name, test)];
    }
    else {
      if (test) {
        if (test.test(name)) {
          return [...files, name];
        }
        return files;
      }
    }
  }, []);
}
exports.getFiles = getFiles;
