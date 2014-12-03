//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
$(document).ready(function () {
	// go to home by default on page load 
	if (location.hash === "#home") {
		navigate();
	} else {
		$("[href='#home']").trigger("click");
	}
});

/**
 * When the hashcode URL changes load that page
 */
function navigate() {
	var hash = location.hash;
	fragmentId = location.hash.substr(1); // strip off # from hash
	// fetch content and load to tab
	$(hash).load(fragmentId + "Info.html", function () {
		console.log("loaded " + hash + " tab data");
		$("#tab-" + fragmentId).tab("show");
	});
}

//// EVENT LISTENERS
// when hashcode changes
window.addEventListener("hashchange", navigate, false);

// when a tab is clicked
$('#mainTabs li a').click(function (e) {
	e.preventDefault(); // this is uber important
	location.hash = this.hash; // this triggers a hashchange event
});

// activate all tooltips on page
$('[data-toggle="tooltip"]').tooltip({'placement': 'right'});

// default start at top of page with slow scroll from:
// http://stackoverflow.com/questions/1144805/how-do-i-scroll-to-the-top-of-the-page-with-jquery
$("[data-toggle='tab']").click(function () {
	$("html, body").animate({scrollTop: 0}, "slow");
	return false;
});