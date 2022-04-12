const Path = require("path");
const { getFiles } = require("./getFiles");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    client: getFiles(Path.resolve(__dirname, "client"), /\.tsx?$/),
  },
  output: {
    path: Path.resolve(__dirname, "dist", "web"),
    filename: "client.js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
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
          to: Path.resolve(__dirname, "dist", "web"),
        },
      ]
    }),
  ],

  // Import files
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss", ".sass"],
  },
};