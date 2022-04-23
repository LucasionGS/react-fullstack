import express from "express";
import Path from "path";
import { apiRouter } from "./apiRouter";
import fs from "fs";

const accessLogFile = Path.resolve(__dirname, "../logs/access.log");
const errorLogFile = Path.resolve(__dirname, "../logs/error.log");

function createLogger<T extends ((...args: any[]) => void) = (message: string) => void>(logFile: string, parser?: T): T {
  const logRecord: string[] = [];
  if (!fs.existsSync(Path.dirname(logFile))) {
    fs.mkdirSync(Path.dirname(logFile), { recursive: true });
  }

  return ((...args) => {
    const msg = parser ? parser(...arguments) : `[${new Date().toISOString()}] ${args[0]}`;
    if (!parser) {
      console.log(msg);
    }
    fs.promises.appendFile(logFile, msg + "\n");

    setTimeout(() => {
      if (logRecord.length > 0) {
        let logFileContent = logRecord.join("\n");
        fs.promises.appendFile(accessLogFile, logFileContent + "\n");
        logRecord.length = 0;
      }
    }, 2000);
  }) as T
}

const accessLog = createLogger(accessLogFile);
const errorLog = createLogger(errorLogFile,
  (message: string, errorType?: string) => `[${new Date().toISOString()}]${errorType ? `[${errorType}]`: ""} ${message}`
);

const app = express();
const options = {
  port: 3000,
};


app.listen(options.port, () => {
  console.log(`Server started on ${options.port} -> ${__dirname}/../web`);
});

// Logging of page requests
app.use("/", (req, res, next) => {
  // Exclude favicon and client.js
  if (req.url !== "/favicon.ico" && req.url !== "/client.js") {
    accessLog(`${req.method} ${req.url} [${req.ip}]`);
  }
  next();
});

// Serve API - Put routes in apiRouter in ./api.ts
app.use("/api", apiRouter, (req, res) => {
  errorLog(`${req.method} ${req.url} [${req.ip}]`, "MissingEndpoint");
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