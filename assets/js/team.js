var aspectRatio = 1.43820224719;
var staff = document.querySelectorAll(".staff-picture");
		
function resizeImages() {
	staff.forEach(function (staffmember, index, arg) {
		staffmember.style.height = (staffmember.clientWidth/aspectRatio) + 'px';
	});
}
  
document.addEventListener("DOMContentLoaded", function(event) {
	window.addEventListener("resize", resizeImages);
		resizeImages();
});