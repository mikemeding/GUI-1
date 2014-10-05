//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
//Custom javascript for loading and organizing photos based on JSON data

// GLOBAL VARS
var imageData;


window.onload = preloader;

// displays the page only when all files have been loaded and DOM is complete
function preloader() {
	getImageData();
	// place photos to dom under content


	// unhide loaded content and hide loading view
	document.getElementById("loading").style.display = "none";
	document.getElementById("content").style.display = "block";
}

/*
 * Get image data from imageInfo.json 
 */
function getImageData() {
	jQuery.ajax({
		async: false,
		dataType: "json",
		url: "imageInfo.json",
		success: function(data) {
			loadImageData(data.pages);
		}
	});

}
//<div class="row">
//					<div class="col-lg-6 col-sm-6">
//						<a href="img/IMG_2.jpg" data-lightbox="collin-car" data-title="a yellow car">
//							<img class="img-rounded img-responsive" src="img/IMG_2.jpg" alt="Another yellow car">
//						</a>
//					</div>
//					<div class="col-lg-6 col-sm-6">
//						<a href="img/IMG_3.jpg" data-lightbox="collin-car" data-title="collin-car">
//							<img class="img-rounded img-responsive" src="img/IMG_3.jpg" alt="Another yellow car">
//						</a>
//					</div>


function loadImageData(data) {
	$.each(data, function(index, element) { // load each page

		// image row div
		var dualImageDiv = document.createElement("div");
		dualImageDiv.setAttribute("class", "row");

		$.each(element.images, function(imageIndex, imageElement) { // load each image

			// div for dual image display
			var formatDiv = document.createElement("div");
			formatDiv.setAttribute("class", "col-lg-6 col-sm-6");

			// link for lightbox stuff 
			var link = document.createElement("a");
			link.setAttribute("href", imageElement.fullPath);
			link.setAttribute("data-lightbox", "link");
			link.setAttribute("data-title", imageElement.description);

			// image tag with all data
			var image = document.createElement("img");
			image.setAttribute("class", "img-rounded img-responsive");
			image.setAttribute("src", imageElement.fullPath);
			image.setAttribute("alt", imageElement.description);

			link.appendChild(image); //image is a child of the lightbox link
			formatDiv.appendChild(link); // single image div
			$("#content").append(formatDiv);

		});





		$("#content").html(link); // add html to page

	});

}

function addDualImages(){
	
}
