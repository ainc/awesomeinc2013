$(document).ready(function() {
	//Hover over home-page buttons
	$("#left-content").hide();
	$("#mid-content").hide();
	$("#right-content").hide();
	$(".company-bio").hide();

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

	//Hover over company portfolios
		$(".company-port").hover(function(e) {
			var time = 300;
			console.log(e.pageX);
			console.log(e.pageY);
			var pos = $(this).offset();
			console.log("img left: " + pos.left);
			console.log("img top: " + pos.top);
		    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());
		    console.log(edge);

		    var bio = $(this).closest('div').find('.company-bio');
		    switch (edge) {
	            case "left":
	            	bio.show('slide', { direction: 'left' }, time);
	                break;
	            case "right":
	                bio.show('slide', { direction: 'right' }, time);
	                break;
	            case "top":
	                bio.show('slide', { direction: 'up' }, time);
	                break;
	            case "bottom":
	                bio.show('slide', { direction: 'down' }, time);
	                break;
		    }
		},
		function(e) {
			var time = 150;
			console.log(e.pageX);
			console.log(e.pageY);
			var pos = $(this).offset();
			console.log("img left: " + pos.left);
			console.log("img top: " + pos.top);
		    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());
		    console.log(edge);

		    var bio = $(this).closest('div').find('.company-bio');
		    switch (edge) {
	            case "left":
	            	bio.hide('slide', { direction: 'left' }, time);
	                break;
	            case "right":
	                bio.hide('slide', { direction: 'right' }, time);
	                break;
	            case "top":
	                bio.hide('slide', { direction: 'up' }, time);
	                break;
	            case "bottom":
	                bio.hide('slide', { direction: 'down' }, time);
	                break;
		    }
		});

	function closestEdge(x,y,l,t,w,h) {
			var r = l + w;
			var b = t + h;

	        var topEdgeDist = distMetric(y, t);
	        var bottomEdgeDist = distMetric(y, b);
	        var leftEdgeDist = distMetric(x, l);
	        var rightEdgeDist = distMetric(x, r);
	        console.log("top: " + topEdgeDist);
	        console.log("bot: " + bottomEdgeDist);
	        console.log("left: " + leftEdgeDist);
	        console.log("right: " + rightEdgeDist);
	        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
	        console.log("min: " + min);
	        switch (min) {
	            case leftEdgeDist:
	                return "left";
	            case rightEdgeDist:
	                return "right";
	            case topEdgeDist:
	                return "top";
	            case bottomEdgeDist:
	                return "bottom";
	        }
	}
	    
	function distMetric(a, b) {
	    var diff = a - b;
	    return (diff * diff);
	}
});
