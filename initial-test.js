var Gpio = require('onoff').Gpio;

// pulse width modulator
var enablerB1 = new Gpio(2, 'out');
var enablerB2 = new Gpio(3, 'out');
var hThree = new Gpio(4, 'out');
var hFour = new Gpio(14, 'out');

enablerB1.writeSync(1, catchErr);
enablerB2.writeSync(1, catchErr);

start();

function start() {
	console.log('start');

	setInterval(function() {
		console.log('one way');
		hThree.writeSync(1, catchErr);
		hFour.writeSync(0, catchErr);

		setTimeout(function(){
			console.log('and another');
			hThree.writeSync(0, catchErr);
			hFour.writeSync(1, catchErr);
		}, 2000);
	}, 4000);
}


function catchErr(err) {
	if(err) {
		throw err;
	}
	console.log('something written');
}

// time is in ms
// function pwm(pin, frequencyTime, dutyCycleTime) {
// 	// start the frequency
// 	console.log('Frequency started');
	
// 	setInterval(function(){	
// 		// turn on the voltage
// 		console.log('Turn on');
// 		pin.writeSync(1, function(err) {
// 			if (err) { throw err; }
// 		});

// 		setTimeout(function(){
// 			// turn off the voltage
// 			console.log('turn off');
// 			pin.writeSync(0, function(err) {
// 				if (err) { throw err; }
// 			});

// 		}, dutyCycleTime);
// 	}, frequencyTime);
// }

// for every half second, be on 60% of the time. 
// If 6v going in, 3.6v goes out

