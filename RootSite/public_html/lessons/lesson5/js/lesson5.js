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
	// create elements
	var singleImageDiv = document.createElement("div");
	var dualImageDiv = document.createElement("div");


	$.each(data, function(index, element) { // load each page

		var i = 0;
		for (i = 0; i < element.images.length; i++) { // load all corresponding images
			if (i + 1 < element.images.length) {
				loadDualImage(element.images[i], element.images[i + 1]);
				i++; // add extra as we are loading 2 images
			} else {
				loadSingleImage(element.images[i]); // loads last image in set
			}
		}

		/*
		 * Loads full width single image to #content div
		 * @param {type} image
		 * @returns {undefined}
		 */
		function loadSingleImage(image) {
			// dual image elements
			var link = document.createElement("a");
			var domImage = document.createElement("img");
			var formatDiv = document.createElement("div");

			// image row div
			singleImageDiv.setAttribute("class", "row");

			// div for dual image display
			formatDiv.setAttribute("class", "col-lg-12 col-sm-12");

			// load image 1
			// link for lightbox stuff 
			link.setAttribute("href", image.fullPath);
			link.setAttribute("data-lightbox", image.setName);
			link.setAttribute("data-title", image.description);

			// image tag with all data
			domImage.setAttribute("class", "img-rounded img-responsive");
			domImage.setAttribute("src", image.fullPath);
			domImage.setAttribute("alt", image.description);

			link.appendChild(domImage); //image is a child of the lightbox link
			formatDiv.appendChild(link); // full single image div
			singleImageDiv.appendChild(formatDiv); // dual image block

			$("#content").append(singleImageDiv);
		}

		/*
		 * Loads and appends dual image block to #content div
		 */
		function loadDualImage(image1, image2) {
			// dual image elements
			var link1 = document.createElement("a");
			var link2 = document.createElement("a");
			var domImage1 = document.createElement("img");
			var domImage2 = document.createElement("img");
			var formatDiv1 = document.createElement("div");
			var formatDiv2 = document.createElement("div");

			// image row div
			dualImageDiv.setAttribute("class", "row");

			// div for dual image display
			formatDiv1.setAttribute("class", "col-lg-6 col-sm-6");
			formatDiv2.setAttribute("class", "col-lg-6 col-sm-6");

			// load image 1
			// link for lightbox stuff 
			link1.setAttribute("href", image1.fullPath);
			link1.setAttribute("data-lightbox", image1.setName);
			link1.setAttribute("data-title", image1.description);

			// image tag with all data
			domImage1.setAttribute("class", "img-rounded img-responsive");
			domImage1.setAttribute("src", image1.fullPath);
			domImage1.setAttribute("alt", image1.description);

			// load image 2
			// link for lightbox stuff 
			link2.setAttribute("href", image2.fullPath);
			link2.setAttribute("data-lightbox", image2.setName);
			link2.setAttribute("data-title", image2.description);

			// image tag with all data
			domImage2.setAttribute("class", "img-rounded img-responsive");
			domImage2.setAttribute("src", image2.fullPath);
			domImage2.setAttribute("alt", image2.description);

			link1.appendChild(domImage1); //image is a child of the lightbox link
			link2.appendChild(domImage2);
			formatDiv1.appendChild(link1); // full single image div
			formatDiv2.appendChild(link2);
			dualImageDiv.appendChild(formatDiv1); // dual image block
			dualImageDiv.appendChild(formatDiv2);

			$("#content").append(dualImageDiv);
		}
		function loadQuadImage(image1, image2, image3, image4) {

		}





	});

}

function addDualImages() {

}
