// Importing necessary modules
require("module-alias/register");
const osc = require("osc");
const http = require("http");
const { URLSearchParams } = require("url");
const { offset, hrMessage, chatbox, hostname, port } = require("@root/config.js");

// Variable to store previous heart rate
let previousHeartRate = null;

// Function to get heart rate icon based on change
const getHeartRateIcon = (currentHeartRate) => {
  if (previousHeartRate === null) {
    previousHeartRate = currentHeartRate;
    return "";
  }
  let icon = "";
  if (currentHeartRate > previousHeartRate) {
    icon = "⤴️";
  } else if (currentHeartRate < previousHeartRate) {
    icon = "⤵️";
  }
  previousHeartRate = currentHeartRate;
  return icon;
};

// Function to parse message with heart rate and change icon
let parsedMessage = (content, heartRate, heartRateChangeIcon) => {
  return content
    .replaceAll(/{heartRate}/g, heartRate)
    .replaceAll(/{heartRateChangeIcon}/g, heartRateChangeIcon);
};

// Importing logging modules
const pino = require("pino");
const logger = pino.default(
  {
    level: "info",
  },
  pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
      singleLine: false,
      hideObject: false,
      customColors: "info:blue,warn:yellow,error:red",
    },
  })
);

// Initialize OSC client
const vrchatOSC = new osc.UDPPort({
  remoteAddress: "localhost",
  remotePort: 9000,
  metadata: true,
});

// Open OSC client
vrchatOSC.open();

// Handle OSC client ready event
vrchatOSC.on("ready", () => {
  logger.info("OSC client ready");
});

// Handle OSC client error event
vrchatOSC.on("error", (error) => {
  logger.error("OSC client error:", error);
});

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const postData = new URLSearchParams(body);
      const heartRate = Math.max(parseInt(postData.get("rate")) + offset, 0);
      const heartRateChangeIcon = getHeartRateIcon(heartRate);
      logger.info("Current Heart Rate:" + " " + parsedMessage(hrMessage, heartRate, heartRateChangeIcon));

      // Send heart rate OSC message
      vrchatOSC.send({
        address: "/avatar/parameters/Heartrate",
        args: [{ type: "i", value: heartRate }],
      });
      if (chatbox === true) {
        // Send chatbox message
        vrchatOSC.send({
          address: "/chatbox/input",
          args: [
            { type: "s", value: parsedMessage(hrMessage, heartRate, heartRateChangeIcon) },
            { type: "T", value: true },
          ],
        });
        // Send chatbox message to console for debugging
        // logger.info(parsedMessage(hrMessage, heartRate))
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("OK");
    });
  }
});

// Start HTTP server
server.listen(port, hostname, () => {
  if (chatbox === true) {
    logger.info("Chatbox enabled");
  }
  logger.info(
    `Server running at http://${hostname}:${port}/\nWaiting for connection...`
  );
});
