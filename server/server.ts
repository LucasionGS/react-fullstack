import express from "express";
import Path from "path";
import { apiRouter } from "./apiRouter";
import fs from "fs";

const accessLogRecord: string[] = [];
const errorLogRecord: string[] = [];

const accessLogFile = Path.resolve(__dirname, "../logs/access.log");
const errorLogFile = Path.resolve(__dirname, "../logs/error.log");
if (!fs.existsSync(Path.dirname(accessLogFile))) {
  fs.mkdirSync(Path.dirname(accessLogFile), { recursive: true });
}
if (!fs.existsSync(Path.dirname(errorLogFile))) {
  fs.mkdirSync(Path.dirname(errorLogFile), { recursive: true });
}

setInterval(() => {
  if (accessLogRecord.length > 0) {
    let logFileContent = accessLogRecord.join("\n");
    fs.promises.appendFile(accessLogFile, logFileContent + "\n");
    accessLogRecord.length = 0;
  }
  if (errorLogRecord.length > 0) {
    let logFileContent = errorLogRecord.join("\n");
    fs.promises.appendFile(errorLogFile, logFileContent + "\n");
    errorLogRecord.length = 0;
  }
}, 2000);

function accessLog(message: string) {
  const msg = `[${new Date().toISOString()}] ${message}`;
  accessLogRecord.push(msg);
  console.log(msg);
}

function errorLog(message: string) {
  const msg = `[${new Date().toISOString()}] ${message}`;
  errorLogRecord.push(msg);
  console.error(msg);
}

const app = express();
const options = {
  port: 3000,
};


app.listen(options.port, () => {
  console.log(`Hosted on ${options.port} -> ${__dirname}/../web`);
});

app.use("/", (req, res, next) => {
  if (req.url !== "/favicon.ico" && req.url !== "/client.js") {
    accessLog(`${req.method} ${req.url} [${req.ip}]`);
  }
  next();
});

// Serve API - Put routes in apiRouter in ./api.ts
app.use("/api", apiRouter, (req, res) => {
  errorLog(`${req.method} ${req.url} [${req.ip}]`);
  res.status(404).json({
    error: "Endpoint not found",
  });
});

// Static content, hosting the react app.
const path = Path.resolve(__dirname + "/../web");
app.use("/", express.static(path), (req, res) => {
  // Send index.html for any non-static files
  res.sendFile(path + "/index.html");
});