//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
//This page is designed to show a simple page that includes some 
//handwritten css with good selectors and a bit of javascript


// displays the page only when all files have been loaded and DOM is complete
function preloader() {
	document.getElementById("loading").style.display = "none";
	document.getElementById("content").style.display = "block";
	getImageData();
}
window.onload = preloader;

/*
 * Get image data from imageInfo.json 
 */
function getImageData() {
	var story;
	jQuery.ajax({
		async: false,
		dataType: "json",
		url: "imageInfo.json",
		success: function(data) {
			story = data;
		}
	});

	console.log(story);
}


