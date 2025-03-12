const http = require("http")

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("Home page");
  }
  else if (url === '/projects') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("Project page");
  }
  else {
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.end("Page not found!")
  }
});

const port = 8000;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
