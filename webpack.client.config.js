const Path = require("path");
const { getFiles } = require("./getFiles");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const {
    production,
  } = env;

  const out = Path.resolve(__dirname, production ? "build" : "dist");

  return ({
    mode: production ? "production" : "development",
    entry: {
      client: "./client/App.tsx",
    },
    output: {
      path: Path.resolve(out, "web"),
      filename: "client.js",
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
        { test: /\.css$/, use: "css-loader" },
        {
          test: /\.s[ca]ss$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        }
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: Path.resolve(__dirname, "public"),
            to: Path.resolve(out, "web"),
          },
        ]
      }),
    ],

    // Import files
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss", ".sass"],
    },
  });
}