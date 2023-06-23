const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // Wybierz dowolny numer portu, na którym chcesz uruchomić serwer

const server = http.createServer((req, res) => {
  //const filePath = path.join(__dirname, req.url === '/' ? 'index_lottery.html' : req.url);
  const filePath = path.join(__dirname, req.url === '/' ? 'temporary.html' : req.url);
  const fileExtension = path.extname(filePath);
  const contentType = getContentType(fileExtension);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

function getContentType(fileExtension) {
  switch (fileExtension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}
