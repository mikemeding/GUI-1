//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
//Custom javascript for loading and organizing photos based on JSON data

// displays the page only when all files have been loaded and DOM is complete
jQuery(document).ready(function($) {
	getImageData();// place photos to dom under content

	// unhide loaded content and hide loading view
	$("#loading").addClass("hidden");
	$("#display-area").removeClass("hidden");


	$('#tabs').tab(); // enable nav bar on side	
});

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

/*
 * load image and page data to page
 * @param {type} data
 * @returns {undefined}
 */
function loadImageData(data) {
	var renderPage = "<div id='active-photos' class='tab-content'>";
	var pageNames = [];

	$.each(data, function(index, element) { // load each page
		pageNames[index] = element.pageName;
		if (index === 0) { // first element is active
			renderPage += "<div class='tab-pane active' id='" + element.pageName + "'>";
		} else {
			renderPage += "<div class='tab-pane' id='" + element.pageName + "'>";
		}

		var i = 0;
		var renderPhotos = "";
		for (i = 0; i < element.images.length; i++) { // load all corresponding images
			if (element.images.length >= 4) {
				renderPhotos += loadQuadImage(element.images[i], element.images[i + 1], element.images[i + 2], element.images[i + 3]);
				i = i + 4; // as we just loaded 4 images
			}
			if (i < element.images.length && i + 1 < element.images.length) {
				renderPhotos += loadDualImage(element.images[i], element.images[i + 1]);
				i++; // add extra as we are loading 2 images
			} else {
				if (i < element.images.length) {
					renderPhotos += loadSingleImage(element.images[i]); // loads last image in set
				}
			}
		}

		renderPage += renderPhotos; // need to add pagination stuff
		renderPage += "</div>";
	});

	renderPage += "</div>";

	$("#content").html(renderPage); // add photo content to page 

	loadPageNav(pageNames); // load nav bar on the side to switch pages
	/*
	 *	Loads the nav bar on the side with the given array of page names 
	 * @param {Array} pages
	 */
	function loadPageNav(pages) {
		var navigator = "<ul id='tabs' class='nav nav-pills nav-stacked' data-tabs='tabs'>";
		$.each(pages, function(index, element) { // load each page
			if (index === 0) { // first element is active
				navigator += "<li class='active'><a href='#" + element + "' data-toggle='tab'>" + element + "</a>";
				navigator += "</li>";
			} else {
				navigator += "<li><a href='#" + element + "' data-toggle='tab'>" + element + "</a>";
				navigator += "</li>";
			}
		});
		navigator += "</ul>";

		$("#navigator").html(navigator); // add side navigator

	}


	/*
	 * Loads full width single image to #content div
	 * @param {type} image
	 */
	function loadSingleImage(image) {
		var singleImageContent = "<div class='row'>";
		singleImageContent += "<div class='col-lg-12 col-sm-12'>";
		singleImageContent += "<a href='" + image.fullPath + "' data-lightbox='" + image.setName + "' data-title='" + image.description + "'>";
		singleImageContent += "<img class='img-rounded img-responsive' src='" + image.fullPath + "' alt='" + image.description + "' >";
		singleImageContent += "</a>";
		singleImageContent += "<blockquote>";
		singleImageContent += "<p>" + image.description + "</p>";
		singleImageContent += "</blockquote>";
		singleImageContent += "</div>";
		singleImageContent += "</div>";

		return singleImageContent; // return formatted html string
	}

	/*
	 * Loads and appends dual image block to #content div
	 */
	function loadDualImage(image1, image2) {
		var dualImageContent = "<div class='row'>";
		dualImageContent += "<div class='col-lg-6 col-sm-6'>";
		dualImageContent += "<a href='" + image1.fullPath + "' data-lightbox='" + image1.setName + "' data-title='" + image1.description + "'>";
		dualImageContent += "<img class='img-rounded img-responsive' src='" + image1.fullPath + "' alt='" + image1.description + "' >";
		dualImageContent += "</a>";
		dualImageContent += "<blockquote>";
		dualImageContent += "<p>" + image1.description + "</p>";
		dualImageContent += "</blockquote>";
		dualImageContent += "</div>";
		dualImageContent += "<div class='col-lg-6 col-sm-6'>";
		dualImageContent += "<a href='" + image2.fullPath + "' data-lightbox='" + image2.setName + "' data-title='" + image2.description + "'>";
		dualImageContent += "<img class='img-rounded img-responsive' src='" + image2.fullPath + "' alt='" + image2.description + "' >";
		dualImageContent += "</a>";
		dualImageContent += "<blockquote>";
		dualImageContent += "<p>" + image2.description + "</p>";
		dualImageContent += "</blockquote>";
		dualImageContent += "</div>";
		dualImageContent += "</div>";

		return dualImageContent;
	}

	/*
	 * Load 4 images in our row
	 */
	function loadQuadImage(image1, image2, image3, image4) {
		var quadImageContent = "<div class='row'>";
		quadImageContent += "<div class='col-lg-3 col-sm-3'>";
		quadImageContent += "<a href='" + image1.fullPath + "' data-lightbox='" + image1.setName + "' data-title='" + image1.description + "'>";
		quadImageContent += "<img class='img-rounded img-responsive' src='" + image1.fullPath + "' alt='" + image1.description + "' >";
		quadImageContent += "</a>";
		quadImageContent += "<blockquote>";
		quadImageContent += "<p>" + image1.description + "</p>";
		quadImageContent += "</blockquote>";
		quadImageContent += "</div>";
		quadImageContent += "<div class='col-lg-3 col-sm-3'>";
		quadImageContent += "<a href='" + image2.fullPath + "' data-lightbox='" + image2.setName + "' data-title='" + image2.description + "'>";
		quadImageContent += "<img class='img-rounded img-responsive' src='" + image2.fullPath + "' alt='" + image2.description + "' >";
		quadImageContent += "</a>";
		quadImageContent += "<blockquote>";
		quadImageContent += "<p>" + image2.description + "</p>";
		quadImageContent += "</blockquote>";
		quadImageContent += "</div>";
		quadImageContent += "<div class='col-lg-3 col-sm-3'>";
		quadImageContent += "<a href='" + image3.fullPath + "' data-lightbox='" + image3.setName + "' data-title='" + image3.description + "'>";
		quadImageContent += "<img class='img-rounded img-responsive' src='" + image3.fullPath + "' alt='" + image3.description + "' >";
		quadImageContent += "</a>";
		quadImageContent += "<blockquote>";
		quadImageContent += "<p>" + image3.description + "</p>";
		quadImageContent += "</blockquote>";
		quadImageContent += "</div>";
		quadImageContent += "<div class='col-lg-3 col-sm-3'>";
		quadImageContent += "<a href='" + image4.fullPath + "' data-lightbox='" + image4.setName + "' data-title='" + image4.description + "'>";
		quadImageContent += "<img class='img-rounded img-responsive' src='" + image4.fullPath + "' alt='" + image4.description + "' >";
		quadImageContent += "</a>";
		quadImageContent += "<blockquote>";
		quadImageContent += "<p>" + image4.description + "</p>";
		quadImageContent += "</blockquote>";
		quadImageContent += "</div>";
		quadImageContent += "</div>";

		return quadImageContent;
	}




}

