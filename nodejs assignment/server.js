const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const data = fs.readFileSync("public/index.html", "utf8");
    res.end(data);
  } else if (req.url === "/contact") {
    const data = fs.readFileSync("public/contact.html", "utf8");
    res.end(data);
  } else {
    const data = fs.readFileSync("public/404.html", "utf8");
    res.end(data);
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
