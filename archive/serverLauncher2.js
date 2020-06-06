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

  // fs.readFile(mainBodyHTMLPath, function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   res.end();
  // });

  // fs.readFile(mainBodyHTMLPath, function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   res.end();
  // });


 // var promises= [{file: mainCSSPath, type: 'text/css'} , {file: mainBodyHTMLPath, type: 'text/html'}].map(function(_path){
  var types = ['text/css', 'text/html', 'text/javascript'];
  //var types = ['text/css','text/html'];
  var ix = 0;
  var promises= [ mainCSSPath, mainBodyHTMLPath, mainScriptPath].map(function(_path){
 // var promises= [ mainCSSPath, mainBodyHTMLPath].map(function(_path){
    return new Promise(function(_path, resolve, reject){
        fs.readFile(_path, 'utf8', function(err, data){
            if(err){
               console.log(err);
               resolve("");    //following the same code flow
            }else{
               resolve(data);
            }
        });
    }.bind(this, _path));
  });
  


  Promise.all(promises).then(function(results){
    //Put your callback logic here
    
    //res.writeHead(200, {"Content-Type": contentType});
    //alert('herllo');


    
  // console.log(results[0]);
    results.forEach(function(content){
 
          let contentType = 'text/mixed';
    //let contentType = types[1];
    res.writeHead(200, {"Content-Type": contentType});

      console.log(contentType);
      
      res.write(content);
      ix = ix + 1;
  
    });
    
    // res.writeHead(200, {"Content-Type": content.type});
    // results.forEach(function(content){res.write(content)});
    
    
    res.end();
  });

}).listen(8080);

