$(function() {

// todo: Load images as it scrolls (Lazy loading)
// adding hash

	function getImageObjects() { // currently doesn't work
		imgIds = [];
		imgWidths = [];

		$.getJSON("/assets/ajax/ir_data.json", function ( data ) {
			var images = data.images.map( function ( item ) {
				var imgNumber = item.number;
				var imgWidth = item.width;

				// img = {};
				// img["id"] = imgNumber;
				// img["width"] = imgWidth;
				// console.log(img);

				imgIds.push(imgNumber);
				imgWidths.push(imgWidth);

			});
		});
		return imgWidths;
	}
	var widths = getImageObjects(); // currently doesn't work
	var bodyWidth = 0;
	
	var WINDOW_WIDTH_CONST = $( window ).width();
	var WINDOW_HEIGHT_CONST = $( window ).height();

	var firstImageWidth = 1857; // dynamically change later
	var firstImageHeight = 1048; // dynamically change later

	var heightScaleRatio = WINDOW_HEIGHT_CONST / firstImageHeight;
	var widthScaleRatio =  WINDOW_WIDTH_CONST / firstImageWidth;

	var targetScaleRatio = heightScaleRatio > widthScaleRatio ?
							 widthScaleRatio : heightScaleRatio 

	var targetImageWidth = firstImageWidth * targetScaleRatio;
	var targetImageHeight = firstImageHeight * targetScaleRatio;
	var targetFooterHeight = WINDOW_HEIGHT_CONST - targetImageHeight > 30 ?
								WINDOW_HEIGHT_CONST - targetImageHeight : 112;

	var scrollPos;
	var imageWidths = [];

	$( document ).ready(function() {
		var imageDOM = [];
		
		var hashValue = window.location.hash;
		// console.log("hash: " + hashValue);
		scrollPos = $( document ).scrollLeft();
		// console.log("scroll: " + scrollPos);

		$( "#footer" ).css("height", ( targetFooterHeight ) ); // dynamically change later
		var targetBottomAdjust = Math.round( ( - ( targetFooterHeight / 20 ) ) );
		$( "#footer" ).css("bottom", ( targetBottomAdjust + "%" ) );

		$.getJSON("/assets/ajax/ir_data.json", function ( data ) {
			var images = data.images.map( function ( item ) {

				var imgNumber = item.number;
				var divWidth = item.width;
				var imgWidth = item.width * targetScaleRatio;
				var htmlStr = "<div class='section' id='" + imgNumber + "' style='width:" + imgWidth + "'><img src='/assets/img/IR2/" + imgNumber + "-min.jpg' height='" + targetImageHeight + "px' /></div>"
				imageDOM.push(htmlStr);
				imageWidths.push(imgWidth);
				// console.log(bodyWidth);
				bodyWidth += parseInt(imgWidth);
				return item.number + ': ' + item.width;
			});
			for (i = 0; i < 37; i++) {
				currImg = imageDOM[i];

				$(".container").append( currImg );
			}
			$('body').css("width", bodyWidth + 22);	
		});

		
		
	});

	function getPositionToGoToRight(divId) {
		var totalWidth = 0;
		var allWidths = [];

		for (var j = 0; j < divId; j++) {
			totalWidth = totalWidth + imageWidths[j];
		}
		return totalWidth;
	}

	function getPositionToGoToLeft(divId) {
		var totalWidth = 0;
		var allWidths = [];

		for (var j = 0; j < divId - 2; j++) {
			totalWidth = totalWidth + imageWidths[j];
		}
		return totalWidth;
	}

	// Move screen to the right
	$( "a.right" ).click( function ( event ) {
		// console.log( $('#3').visible( true ) );
		// var inViewportDiv = $( ":in-viewport" );
		var inViewportDiv = $( ":in-viewport" )[1];

		if ( typeof $( inViewportDiv ).attr( 'id' ) === 'undefined' ) {
			inViewportDiv = $( ":in-viewport" )[2];
		}

		viewportDivId = $( inViewportDiv ).attr( 'id' );
		viewportDivWidth = $( inViewportDiv ).width();

		// console.log( "id: " + viewportDivId + " width: " + viewportDivWidth );
		// console.log(scrollPos);
		var totalWidth = getPositionToGoToRight(viewportDivId);
		$( 'html, body' ).stop().animate( {
			scrollLeft: totalWidth + 10
		}, 1500, 'easeInOutExpo');
		// event.preventDefault();
		// window.location.hash = this.hash;
		// $( $( this ).attr( 'href' ) ).fadeIn( 'slow' );
	});

	// Move screen to the left
	$( "a.left" ).click( function ( event ) {
		// console.log( $('#3').visible( true ) );
		// var inViewportDiv = $( ":in-viewport" );
		var inViewportDiv = $( ":in-viewport" )[1];

		if ( typeof $( inViewportDiv ).attr( 'id' ) === 'undefined' ) {
			inViewportDiv = $( ":in-viewport" )[2];
		}

		viewportDivId = $( inViewportDiv ).attr( 'id' );
		viewportDivWidth = $( inViewportDiv ).width();

		// console.log( "id: " + viewportDivId + " width: " + viewportDivWidth );
		// console.log(scrollPos);
		var totalWidth = getPositionToGoToLeft(viewportDivId);
		$( 'html, body' ).stop().animate( {
			scrollLeft: totalWidth + 10
		}, 1500, 'easeInOutExpo');
		// event.preventDefault();
		// window.location.hash = this.hash;
		// $( $( this ).attr( 'href' ) ).fadeIn( 'slow' );
	});


	// $('ul.nav a').bind('click', function(event) {
	// $('a.right').click(function(event) {

	// 	var div = $(this).closest(".section");
	// 	var nextDiv = div.next();

	//     $('html, body').stop().animate({
	//         scrollLeft: windowWidth
	//     }, 1500,'easeInOutExpo');
 //    	event.preventDefault();
	// });

	// move screen left
	// $('a.left').click(function(event) {

	// 	var div = $(this).closest(".section");
	// 	var prevDiv = div.prev();

	// 	var leftPos = $('body').scrollLeft();
	//     $('html, body').stop().animate({
	//         scrollLeft: $(prevDiv).offset().left
	//     }, 1500,'easeInOutExpo');
 //    	event.preventDefault();
	// });
});








// var innerHTML = "<div class='section' id='1'><img src='/assets/img/IR2/1.png' /><ul class='nav'><li><a class='left'><i class='fa fa-angle-left'></i></a></li><li><a class='right'><i class='fa fa-angle-right' ></i></a></li></ul></div>"
		// var elems = $();
		// for (i = 0; i < 8; i++) {
		// 	var currElem = "<div class='section' id='" + (i+1) + "'><img src='/assets/img/IR2/" + (i+1) + ".png' /><ul class='nav'><li><a class='left'><i class='fa fa-angle-left'></i></a></li><li><a class='right'><i class='fa fa-angle-right' ></i></a></li></ul></div>"
		// 	elems = elems.add(currElem);
		// 	// $( ".container" ).append( innerHTML );
		// }
		// $('.container').append(elems);
		// var img_widths = $();
		// // var pic_width;
		// $( ".section" ).each(function( index ) {
		// 	var img = $(this).find( "img" );
			
			
		// 	$("<img/>")
		// 		.attr("src", $(img).attr("src"))
		// 		.load(function() {
					
		// 			pic_width = this.width;
		// 			console.log("this: " + pic_width);
		// 			img_widths = img_widths.add(pic_width);
		// 			$(this).css("width", pic_width);
		// 		});

		// 	var imgWidth = $(this).find( "img" ).width;
		// });