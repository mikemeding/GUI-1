//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
// This is the javascript to support the lesson6 page

var validation = function(event) {
	// preform validation here
	console.log("submit clicked");

	// get the value from all fields
	var startVal1 = $("#startVal1").val();
	var endVal1 = $("#endVal1").val();
	var startVal2 = $("#startVal2").val();
	var endVal2 = $("#endVal2").val();
	var errorMessage = "The red highlighted fields have errors: ";
	var errorOccurred = false;

	console.log(startVal1 + " " + endVal1 + " " + startVal2 + " " + endVal2);

		// if one of the fields does not have a value
		if (!$.isNumeric(startVal1)) {
			$("#startVal1Group").addClass("has-error");
			errorMessage += "Multiplier(start value) ";
			errorOccurred = true;
		}


if(errorOccurred){
	$("#multForm-error").removeClass("hidden");
	$("#multForm-errorMessage").html(errorMessage);
}
//		$("#myModal").modal('hide');

};

// when DOM is finished and everything is loaded
$(document).ready(function(event) {
	console.log("modal display");
	$("#myModal").modal('show');
});

$("#multForm").submit(validation);


