var Gpio = require('onoff').Gpio;

var motor1 = new Motor(2, 3, 4, 14);

// Drop in which GPIO port these inputs are using
function Motor(enabler1Pin, enabler2Pin, inputMainPin, inputSecondPin) {
	var enabler1 = new Gpio(enabler1Pin, 'out');
	var enabler2 = new Gpio(enabler2Pin, 'out');

	// enable the enabler pins on the H-Bridge
	enabler1.writeSync(1, catchErr);
	enabler2.writeSync(1, catchErr);

	// be able to access the directional pins
	return {
		input1: new Gpio(inputMainPin, 'out'),
		input2: new Gpio(inputSecondPin, 'out')
	}
}

function counterClockwise(motor) {
	console.log('one way');
	motor.input1.writeSync(1, catchErr);
	motor.input2.writeSync(0, catchErr);
}

function clockwise(motor) {
	console.log('other way');
	motor.input1.writeSync(0, catchErr);
	motor.input2.writeSync(1, catchErr);
	return;
}

function stop(motor) {
	motor.input1.writeSync(0, catchErr);
	motor.input2.writeSync(0, catchErr);
	return;
}

function start() {
	console.log('start');

	setInterval(function() {
		clockwise(motor1);

		setTimeout(function(){
			counterClockwise(motor1);
		}, 2000);
	}, 4000);
}

start();

function catchErr(err) {
	if(err) {
		throw err;
	}
	console.log('something written');
}