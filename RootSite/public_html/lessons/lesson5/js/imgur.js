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

//	$('#tabs').tab(); // enable nav bar on side	
});

/*
 * Get image data from imageInfo.json 
 */
function getImageData() {
	jQuery.ajax({
		async: false,
		dataType: "json",
		url: "albumList.json",
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
		console.log(element);

		for (i = 0; i < element.albums.length; i++) { // load all corresponding images
			renderPhotos += "<h2>" + element.albums[i].description + "</h2>";
			renderPhotos += element.albums[i].url; // the iFrame for IMGUR
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
}