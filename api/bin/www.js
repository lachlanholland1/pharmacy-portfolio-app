#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("../app.js");
const debug = require("debug");
const http = require("http");
// const https = require("https");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Get port from environment and store in Express.
 */

const options = {
  key: fs.readFileSync("bin/key.pem"),
  cert: fs.readFileSync("bin/cert.pem"),
};

/**
 * Create HTTP server.
 */

var httpServer = http.createServer(app).listen(9000);

// var httpsServer = https.createServer(options, app).listen(1000);

/**
 * Listen on provided port, on all network interfaces.
 */

// httpServer.listen(port);
// httpServer.on("error", onError);
httpServer.on("listening", onListening);
// httpsServer.listen(port);
// httpsServer.on("error", onError);
// httpsServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  // var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // debug("Listening on " + bind);
}
