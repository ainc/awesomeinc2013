$(document).ready(function(){

var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];
var kstc = [];

$( ".entry_points" ).hover(function() {

    $( "#two_0" ).attr("class", " show" );
  },function() {

   $( "#two_0" ).attr("class", "show hide" );
  });

$( ".preseed_funding" ).hover(function() {

    $( "#two_0" ).attr("class", " show" );
  },function() {
   $( "#two_0" ).attr("class", "show hide" );
  });

$( ".accelerators" ).hover(function() {

    $( "#two_0" ).attr("class", " show" );
  },function() {

   $( "#two_0" ).attr("class", "show hide" );
  });


$( ".angel_investors" ).hover(function() {


        $( "#two_0" ).attr("class", " show" );
  },function() {

    $( "#two_0" ).attr("class", "show hide" );
  });


$( ".tech_resources" ).hover(function() {


  $( "#two_0" ).attr("class", " show" );
  },function() {

   $( "#two_0" ).attr("class", "show hide" );
  });


$( ".venture_capital" ).hover(function() {


      $( "#two_0" ).attr("class", " show" );
  },function() {


   $( "#two_0" ).attr("class", "show hide" );
  });



var elem = document.getElementById('pipeline');

var two = new Two({
            
      autostart: true,
      width: 1600 , 
      height: 3291 
    });

two.appendTo(elem);


var styles = {
            family: 'proxima-nova, sans-serif',
            size: 15,
            leading: 15,
            weight: 900
          };


var msg = "This is a message created to test ";
var msg2 = "how many words we can put within this box";




var rect0 = two.makeRectangle(490, 540, 500, 325);
var rect1 = two.makeRectangle(1100, 1040, 500, 325);
var rect2 = two.makeRectangle(470, 1420, 500, 325);
var rect3 = two.makeRectangle(1100, 1800, 500, 325);
var rect4 = two.makeRectangle(470, 2180, 500, 325);
var rect5 = two.makeRectangle(1100, 2565, 500, 325);

rect0.stroke = '#929497';
rect0.fill = '#e6e7e8';
rect0.linewidth = '2';

rect1.stroke = '#929497';
rect1.fill = '#e6e7e8';
rect1.linewidth = '2';

rect2.stroke = '#929497';
rect2.fill = '#e6e7e8';
rect2.linewidth = '2';

rect3.stroke = '#929497';
rect3.fill = '#e6e7e8';
rect3.linewidth = '2';

rect4.stroke = '#929497';
rect4.fill = '#e6e7e8';
rect4.linewidth = '2';

rect5.stroke = '#929497';
rect5.fill = '#e6e7e8';
rect5.linewidth = '2';

var text = two.makeText(msg, 400, 400, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 445, 420, styles);
    
            text.fill = '#333333';

var text = two.makeText(msg, 1010, 900, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 1055, 920, styles);
    
            text.fill = '#333333';

var text = two.makeText(msg, 380, 1280, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 425, 1300, styles);
    
            text.fill = '#333333';

var text = two.makeText(msg, 1010, 1660, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 1055, 1680, styles);
    
            text.fill = '#333333';

var text = two.makeText(msg, 380, 2160, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 425, 2180, styles);
    
            text.fill = '#333333';


var text = two.makeText(msg, 1010, 2420, styles);
            
            text.fill = '#333333';
var text = two.makeText(msg2, 1055, 2440, styles);
    
            text.fill = '#333333';



// Update the renderer in order to generate corresponding DOM Elements.
two.update();


two.bind('update', function(frameCount, timeDelta) {

// if (opacity <= 1){
    //rect0.rotation = frameCount / 10;
// }
  
});


});