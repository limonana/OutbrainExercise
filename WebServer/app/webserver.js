var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

let port= 8080;
app.listen(port);
console.log('Webserver Listen on port ' + port);