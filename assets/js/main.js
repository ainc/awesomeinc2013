$(document).ready(function() {
	//Hover over home-page buttons
	$("#left-content").hide();
	$("#mid-content").hide();
	$("#right-content").hide();
	$(".company-bio").hide();
	$(".ta-bio").hide();

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
			var pos = $(this).offset();
		    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());

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
			var pos = $(this).offset();
		    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());

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
// hover over team alpha img
		$(".ta-port").hover(function(e) {
					var time = 300;
					var pos = $(this).offset();
				    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());

				    var bio = $(this).closest('div').find('.ta-bio');
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
					var pos = $(this).offset();
				    var edge = closestEdge(e.pageX, e.pageY, pos.left, pos.top, $(this).width(), $(this).height());

				    var bio = $(this).closest('div').find('.ta-bio');
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
	        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
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

	//make bg image full size

	$("#headerwrap").css("height", getWindowHeight()) - 50; //for navbar
	$("#headerwrap").css("width", getWindowWidth());
	$(window).resize(function() {
		$("#headerwrap").css("height", getWindowHeight())- 50; 
		$("#headerwrap").css("width", getWindowWidth());
	})
});

var getWindowHeight = function() {
	var winHeight = $(window).height();
	return winHeight;
}

var getWindowWidth = function() {
	var winWidth = $(window).width();
	return winWidth;
}



// $('#myCarousel').carousel({
//   interval: 10000
// });

$('.carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  if (next.next().length>0) {
 
      next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
      
  }
  else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
     
  }

});