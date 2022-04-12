const Path = require("path");

const clientConfig = require("./webpack.client.config.js");
const serverConfig = require("./webpack.server.config.js");

module.exports = [serverConfig, clientConfig];