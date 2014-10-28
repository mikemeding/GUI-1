//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
$(document).ready(function() {
	// trigger an inital click to load home page
	$('#tabHome').trigger("click");
});
$('#tabHome').click(function(e) {
	e.preventDefault();
	// dynamically load on click
	$("#home").load("indexInfo.html", function() {
		console.log("loaded indexInfo.html");
		// show tab once loaded
		$(this).tab('show');
	});
});
$('#tabLessons').click(function(e) {
	e.preventDefault();
	$("#lessons").load("lessonsInfo.html", function() {
		console.log("loaded lessonsInfo.html");
		// show tab once loaded
		$(this).tab('show');
	});
});
$('#tabAbout').click(function(e) {
	e.preventDefault();
	$("#about").load("aboutInfo.html", function() {
		console.log("loaded aboutInfo.html");
		// show tab once loaded
		$(this).tab('show');
	});
	$(this).tab('show');
});

