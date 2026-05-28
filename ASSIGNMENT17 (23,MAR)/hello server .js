// Assignment 23/03/2026 - Hello Server
// Node.js server that returns different messages on different routes
// Run: node server.js

const http = require("http");

const PORT = 3000;

const routes = {
  "/": "Hello! Welcome to the Home page.",
  "/about": "This is the About page. We build cool things.",
  "/contact": "Reach us at contact@example.com",
  "/hello": "Hello, World!",
  "/bye": "Goodbye! See you next time.",
};

const server = http.createServer((req, res) => {
  const message = routes[req.url];

  if (message) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(message);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Available routes:");
  Object.keys(routes).forEach(route => {
    console.log(`  http://localhost:${PORT}${route}`);
  });
});