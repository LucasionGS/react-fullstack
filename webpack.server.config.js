const Path = require("path");
const { getFiles } = require("./getFiles");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");
module.exports = (env) => {
  const {
    production,
  } = env;

  const out = Path.resolve(__dirname, production ? "build" : "dist");
  
  return ({
    mode: production ? "production" : "development",
    target: "node",
    entry: {
      server: "./server/server.ts",
    },
    output: {
      path: Path.resolve(out, "server"),
      filename: "server.js",
      clean: true,
    },

    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
      ],
    },

    // Import files
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },

    externals: [nodeExternals()]
  });
}
