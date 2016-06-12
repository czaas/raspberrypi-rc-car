(function($){
	"use strict";

	var socket = io();
	var left = {
		mode: 'static',
		color: 'red',
		position: {
			top: '50%',
			left: '50%'
		},
		zone: document.getElementById('joystick-1')
	};
	var right = {
		mode: 'static',
		color: 'red',
		position: {
			top: '50%',
			left: '50%'
		},
		zone: document.getElementById('joystick-2')
	};
	
	var leftJoystick = nipplejs.create(left);
	var rightJoystick = nipplejs.create(right);

	socket.emit('client', 'connected');

	function sendControl(motor, direction) {
		socket.emit('control', {
			motor: motor,
			direction: direction
		});
	}

	leftJoystick.on('plain:up', function(){
		sendControl('left', 'forward');
	});

	leftJoystick.on('plain:down', function(){
		sendControl('left', 'backward');
	});

	leftJoystick.on('end', function() {
		sendControl('left', 'stop');
	});

	rightJoystick.on('plain:up', function(){
		sendControl('right', 'forward');
	});

	rightJoystick.on('plain:down', function(){
		sendControl('right', 'backward');
	});

	rightJoystick.on('end', function() {
		sendControl('right', 'stop');
	});

}(jQuery));