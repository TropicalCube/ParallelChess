mainBodyHTMLPath = 'ParallelChess.html';
mainScriptPath = 'checkers.js';
mainCSSPath = 'stylesheet.css';

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

  // fs.readFile(mainScriptPath, function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/javascript'});
  //   res.write(data);
  //   res.end();
  // });
  // fs.readFile(mainCSSPath, function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/css'});
  //   res.write(data);
  //    res.end();
  // });

  fs.readFile(mainBodyHTMLPath, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

  fs.readFile(mainBodyHTMLPath, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
