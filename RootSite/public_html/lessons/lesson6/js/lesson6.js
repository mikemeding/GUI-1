//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
// This is the javascript to support the lesson6 page

// when DOM is finished and everything is loaded
$("#myModal").modal('show');
console.log("modal display");


$("#formSubmit").click(function() {
	console.log("form submit clicked");
	$("#myModal").modal('hide');
	var number = $("#startVal1").val();
	console.log(number);
});