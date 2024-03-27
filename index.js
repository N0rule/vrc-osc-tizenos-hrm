require('module-alias/register');
const osc = require("osc");
const http = require('http');
const { URLSearchParams } = require('url');
const { chatbox, hostname, port } = require("@root/config.js");

// Initialize OSC client
const vrchatOSC = new osc.UDPPort({
  remoteAddress: "localhost",
  remotePort: 9000,
  metadata: true
});

// Open OSC client
vrchatOSC.open();

// Handle OSC client ready event
vrchatOSC.on("ready", () => {
  console.log("OSC client ready");
});

// Handle OSC client error event
vrchatOSC.on("error", (error) => {
  console.error("OSC client error:", error);
});

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = new URLSearchParams(body);
      const hr = postData.get('rate');
      console.log(`Heart rate: ❤ ${hr} bpm`);

      // Send heart rate OSC message
      vrchatOSC.send({
        address: "/avatar/parameters/Heartrate",
        args: [{ type: "i", value: hr }]
      });

      if (chatbox === true) {
        // Send chatbox message
        vrchatOSC.send({
          address: "/chatbox/input",
          args: [
            { type: "s", value: `❤ ${hr} bpm` },
            { type: "T", value: true }
          ]
        });
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('OK');
    });
  }
});

// Start HTTP server
server.listen(port, hostname, () => {
  if (chatbox === true) {
    console.log("Chatbox enabled");
  }
  console.log(`Server running at http://${hostname}:${port}/\nWaiting for connection...`);
});
