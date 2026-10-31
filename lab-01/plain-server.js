// Load Node.js's built-in HTTP module to create a web server.
const http = require('http');

// Reply to every request with a plain-text greeting and a success status.
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Hello');
});

// Start listening on port 3000 so the page can be opened in a browser.
server.listen(3000, () => {
  console.log('Plain HTTP server listening on port 3000');
});
