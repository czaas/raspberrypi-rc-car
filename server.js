// libaries
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var path = require('path');

// my components
var hardware = require('./hardware.js');

// app settings
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// my settings
var port = 9991;
var leftMotor = new hardware.motor(2, 3, 4, 14);
var rightMotor = new hardware.motor(17, 18, 27, 22);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.post('/', function(req, res){
	var command = req.body.control;
	
});

function controlMotor(motor){ 
	var whichMotor = (motor.motor === 'right') ? rightMotor : leftMotor;

	switch(motor.direction) {
		case 'forward':
			hardware.controls.counterClockwise(whichMotor);
			break;
		case 'backward':
			hardware.controls.clockwise(whichMotor);
			break
		case 'stop':
			hardware.controls.stop(whichMotor);
			break;
		default:
			return;
	}
}

io.on('connection', function(socket) {
	socket.on('client', console.log);

	socket.on('control', function(control){
		console.log(control);
		controlMotor(control);
	});

	socket.on('disconnect', function(){
		console.log('client disconnected, disabling motor');
		controlMotor('stop');
	});
});


server.listen(port, function() {
	console.log('listening on port ' + port)
});