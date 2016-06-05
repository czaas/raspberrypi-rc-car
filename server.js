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
var motor1 = new hardware.motor(2, 3, 4, 14);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.post('/', function(req, res){
	var command = req.body.control;
	
});

function controlMotor(control){ 
	var targetMotor = motor1;

	switch(control) {
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
}

io.on('connection', function(socket) {
	socket.on('client', console.log);

	socket.on('control', function(control){
		console.log(control);
		controlMotor(control.control);
	});

	socket.on('disconnect', function(){
		console.log('client disconnected, disabling motor');
		controlMotor('stop');
	});
});


server.listen(port, function() {
	console.log('listening on port ' + port)
});