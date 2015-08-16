var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var port = 8080;

var sendIndexHTML = function(response) {
  fs.readFile('./index.html',  function(err, page) {
	  response.writeHead(200, {'Content-Type': 'text/html'});
	  response.end(page);
  });
}

var sendCSS = function(response) {
	fs.readFile('css/stylesheet.css', function(err, styling) { 
		response.writeHead(200, {'Content-Type': 'text/css'}); 
		response.end(styling);
	});
}

var sendJS = function(response) {
	fs.readFile('javascripts/scripts.js', function(err, scripting) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(scripting);
	});
}

var sendManifest = function(response) {
  fs.readFile('./manifest.appcache', function(err, offline) {
    response.writeHead(200, {'Content-Type': 'text/appcache'});
    response.end(offline);
  });
}

var sendAjaxResponse = function(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Work Order Submitted Successfully.');
}

var handler = function(request, response) {
  if(request.method === 'POST'){
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            console.log(post);
            sendAjaxResponse(response);
        });
  } else {
      if(request.url === '/')
        sendIndexHTML(response);
      else if(request.url === '/css/stylesheet.css')
      	sendCSS(response);
      else if(request.url === '/javascripts/scripts.js')
        sendJS(response);
      else 
        sendManifest(response);
  }
}

var server = http.createServer(handler).listen(port);
console.log('server running...');