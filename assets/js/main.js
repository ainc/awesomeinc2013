$(document).ready(function() {
	$("#left-content").hide();
	$("#mid-content").hide();
	$("#right-content").hide();

	$("#top-div-left").hover(function() {
		$("#idea-img").hide();
		$("#left-content").show();
		},
		function() {
			$("#left-content").hide();
			$("#idea-img").show();
	});
	$("#top-div-mid").hover(function() {
		$("#involved-img").hide();
		$("#mid-content").show();
		},
		function() {
			$("#mid-content").hide();
			$("#involved-img").show();
	});
	$("#top-div-right").hover(function() {
		$("#code-img").hide();
		$("#right-content").show();
		},
		function() {
			$("#right-content").hide();
			$("#code-img").show();
	});
});
