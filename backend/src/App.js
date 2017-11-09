var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World");

}).listen(4000);

console.log("Backend Server started on port 4000");
