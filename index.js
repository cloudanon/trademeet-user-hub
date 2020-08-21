var http = require('http');
var fs = require("fs");

const server = http.createServer();

server.on('clientError', function(err, socket){
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('request', function(req, res) {
  console.log(req.url)
  if (req.url === "/") {
    fs.readFile("./build/index.html", function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/update" && req.method === 'POST') {

      req.setEncoding('utf8');
       let rawData = '';
       req.on('data', function(chunk){
         rawData += chunk;
       })
       .on('end', function(){

         res.writeHead(200, {
           'Content-Type': 'application/jsons'
         });

         try {
           const parsedData = JSON.stringify(JSON.parse(rawData),0,2);
           fs.writeFile('./api/profile.json', parsedData, function(err){
             if(err){return res.end(JSON.stringify({success: false}));}
           })
           res.end(JSON.stringify({success: true}));
         } catch (err) {
           console.error(err);
           res.end(JSON.stringify({success: false}));
         }
       });

  } else {
    let ctype = req.url.split('.')[1];
    if(ctype === 'mjs'){
      ctype = 'application/javascript'
    } else if(ctype === 'min'){
      ctype = 'text/css'
    }
    fs.readFile('./build' + req.url, function(err, data) {
      res.writeHead(200, {
        'Content-Type': ctype
      });
      res.write(data);
      res.end();
    });
  }
})

server.listen(8000, function(){
  console.log('Server listening at: http://localhost:8000')
});
