// libaries
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// my components
var hardware = require('./hardware.js');

// app settings
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({ extended: true }));

// my settings
var port = 9991;
var motor1 = new hardware.motor(2, 3, 4, 14);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.post('/', function(req, res){
	var command = req.body.control;
	var targetMotor = motor1;

	console.log(command);

	switch(command) {
		case 'forward':
			hardware.controls.clockwise(targetMotor);
			break;
		case 'backward':
			hardware.controls.counterClockwise(targetMotor);
			break
		case 'stop':
			hardware.controls.stop(targetMotor);
			break;
		default:
			return;
	}
});


app.listen(port, function() {
	console.log('listening on port ' + port)
});


