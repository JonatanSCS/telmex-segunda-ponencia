var express = require('express')
var app = express()
var path = require("path");
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('public/index.html', {root: __dirname })
});

app.listen(3000)
