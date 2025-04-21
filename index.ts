import http from "node:http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
  const url: string | undefined = req.url;
  let filePath: string;
  switch (url) {
    case "/":
      filePath = "./index.html";
      break;
    case "/about":
      filePath = "./toulon-siege.html";
      break;
    case "/contact-me":
      filePath = "./contact.html";
      break;
    default:
      filePath = "./notFound404.html";
      break;
  }

  fs.readFile(filePath, (err, page) => {
    if (err) {
      throw err;
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(page);
  });
});

server.listen(8080);
