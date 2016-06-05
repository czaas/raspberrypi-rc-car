(function($){
	"use strict";

	var socket = io();

	var forward = $('.forward');
	var backward = $('.backward');
	var stop = $('.stop');

	socket.emit('client', 'connected');

	$('.controls button').on('click', function(e) {
		e.preventDefault();

		var control = $(this).attr('data-control');

		socket.emit('control', { control: control });

		// $.post('http://czaaspi.localtunnel.me/', {
		// 	control: control
		// })
		// 	.done(function(res){
		// 		setStatus(res);
		// 	});

		// function setStatus(status) {
		// 	$('.status').text(status);
		// }
	});

}(jQuery));