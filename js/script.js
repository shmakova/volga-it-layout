$("#youtube-video-btn").click(function() {
	$("#youtube-video")
		.removeClass("hidden")
		.addClass("visible");
});

$("#registration-modal .reg-btn").click(function() {
	$('#registration-modal').modal('hide')
	$('#confirmation-modal').modal('show')
});

