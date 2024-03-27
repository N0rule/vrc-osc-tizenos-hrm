require('module-alias/register')
const { Client } = require('node-osc');

const http = require('http');

const { hostname, port} = require("@root/config.js");

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // Handle POST request
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = new URLSearchParams(body);
      const hr = postData.get('rate');
      // Log only the heart rate value
      console.log(`Heart rate: ❤  ${hr} bpm`);
      // VRCHAT OSC client
      const vrchatOSC = new Client('127.0.0.1', 9000);
      const heartRateValue = parseInt(hr, 10);
      vrchatOSC.send('/avatar/parameters/Heartrate', heartRateValue, () => {
      //console.log('Heart rate sent to VRChat OSC');
      vrchatOSC.close();
      });
      // Send response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('OK');
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ \nWaiting for connection...`);
});