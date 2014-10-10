var express = require('express');
var path = require('path');
var request = require('request');
var parseString = require('xml2js').parseString;

var app = express();
var port = 9000;

app.get('/catimage', function(req, res) {
	request('http://thecatapi.com/api/images/get?format=xml', function(error, response, body) {
		parseString(body, function(err, result) {
			var imageSource = result.response.data[0].images[0].image[0].url[0];
			res.send(imageSource);
		});
	});
});

app.use(express.static(path.join(__dirname, './app')));

app.listen(9000);

console.log('Server started on port :', port);

