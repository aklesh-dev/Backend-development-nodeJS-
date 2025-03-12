const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req,"req")
  res.writeHead(200, {'content-type': "application/json"})
  res.end(JSON.stringify({data: "Server is live"}))
})

port = 8080;

server.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
})