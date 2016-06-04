(function($){
	"use strict";

	var forward = $('.forward');
	var backward = $('.backward');
	var stop = $('.stop');

	$('.controls button').on('click', function(e) {
		e.preventDefault();

		var control = $(this).attr('data-control');

		$.post('http://czaaspi.localtunnel.me', {
			control: control
		})
			.done(function(res){
				setStatus(res);
			});

		function setStatus(status) {
			$('.status').text(status);
		}
	});
}(jQuery));