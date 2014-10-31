//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
$(document).ready(function() { // Triggered when DOM ready
	// change hashcode to home page
	var hash = "#home";
	location.hash = hash;
	// load that page
	navigate();
});

/**
 * When the hashcode URL changes load that page
 */
function navigate() {
	var hash = location.hash;
	fragmentId = location.hash.substr(1); // strip off # from hash
	// fetch content and load to tab
	if (fragmentId === "home" || !fragmentId) { // for home or no fragment
		$(hash).load("indexInfo.html", function() {
			console.log("loaded " + hash + " tab data");
			$("#tab-home").tab("show");
		});
	} else {
		$(hash).load(fragmentId + "Info.html", function() {
			console.log("loaded " + hash + " tab data");
			$("#tab-" + fragmentId).tab("show");
		});
	}
}

//// EVENT LISTENERS
// when hashcode changes
window.addEventListener("hashchange", navigate, false);

// when a tab is clicked
$('.nav-tabs a').click(function(e) {
	e.preventDefault(); // this is uber important
	location.hash = this.hash; // this triggers a hashchange event
});

