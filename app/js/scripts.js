(function($){
	"use strict";

	var socket = io();

	var forward = $('.forward');
	var backward = $('.backward');
	var stop = $('.stop');

	socket.emit('client', 'connected');

	$('.controls button').on('click', function(e) {
		e.preventDefault();

		var control = {
			direction: $(this).attr('data-control'),
			motor: $(this).parent().attr('motor')
		};

		socket.emit('control', control);
	});

}(jQuery));