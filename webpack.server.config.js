const Path = require("path");
const { getFiles } = require("./getFiles");

module.exports = {
  mode: "development",
  target: "node",
  entry: {
    server: getFiles(Path.resolve(__dirname, "server"), /\.tsx?$/),
  },
  output: {
    path: Path.resolve(__dirname, "dist", "server"),
    filename: "server.js",
    clean: true,
  },
};
