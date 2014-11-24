//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
// global start and end values
var startVal1 = 0;
var endVal1 = 0;
var startVal2 = 0;
var endVal2 = 0;
var totalTabs = 0;


$(document).ready(function() {
	$("#myForm").load("form.html", function() { // load form modal HTML to the page
		$("#myModal").modal('show'); // display modal from form.html once loaded

		// LISTENERS
		$("#multForm").submit(function() {		// when the submit button is clicked on the modal
			$("#myModal").modal('hide'); // attempt to hide which triggers hide event calling validation
		});

		// when any kind of hide action is preformed on the modal
//		$('#myModal').on('hidden.bs.modal', function (event) {
//			if (validation()) { // preform number validation
//				$("#myModal").modal('hide'); // hide modal completely if validation succedes
////				var tableHTML = renderTable();
////				addTab(tableHTML);
//				AddTabButtonClickHandler();
//
//			} else {
//				$("#myModal").modal('show'); // rerender modal with errors
//			}
//		});
		var minRange = -20;
		var maxRange = 20;
		$('#myForm').bootstrapValidator({
			message: 'This value is not valid',
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				start1: {
					message: 'This number is invalid',
					validators: {
						between: {
							min: minRange,
							max: maxRange,
							message: 'Value must be between ' + minRange + ' and ' + maxRange
						},
						notEmpty: {
							message: 'This start value is required and cannot be empty'
						},
						integer: {
							message: 'This value is not an integer'
						}
					}
				},
				start2: {
					message: 'This number is invalid',
					validators: {
						between: {
							min: minRange,
							max: maxRange,
							message: 'Value must be between ' + minRange + ' and ' + maxRange
						},
						notEmpty: {
							message: 'This start value is required and cannot be empty'
						},
						integer: {
							message: 'This value is not an integer'
						}
					}
				},
				end1: {
					message: 'This number is invalid',
					validators: {
						between: {
							min: minRange,
							max: maxRange,
							message: 'Value must be between ' + minRange + ' and ' + maxRange
						},
						notEmpty: {
							message: 'This end value is required and cannot be empty'
						},
						integer: {
							message: 'This value is not an integer'
						}
					}
				},
				end2: {
					message: 'This number is invalid',
					validators: {
						between: {
							min: minRange,
							max: maxRange,
							message: 'Value must be between ' + minRange + ' and ' + maxRange
						},
						notEmpty: {
							message: 'This end value is required and cannot be empty'
						},
						integer: {
							message: 'This value is not an integer'
						}
					}
				}
			}
		})
				  .on('success.', function(e, data) {
					  if (data.bv.isValid()) {
						  console.log("all fields valid");
						  data.bv.disableSubmitButtons(false);
					  }
					  // e, data parameters are the same as in error.field.bv event handler
					  // Despite that the field is valid, by default, the submit button will be disabled if all the following conditions meet
					  // - The submit button is clicked
					  // - The form is invalid
				  });


	});

	$("#myTabs").tabs();
	// console.log( "parent id = " + $("#a").parent().attr( "id" ) ) ;

	// the div containing the complete tabs structure
	// var tabsdiv = $(this).parent().parent() ; 
	var tabsdiv = $("#myTabs");

// the list of tabs
	var tabslist = $("#tab-row");

	// set the number of the next tab to add
	var nextTabNo = tabslist.find("li").length;

	// this function is executed when an add-tab button is clicked
	var AddTabButtonClickHandler = function() {
		// console.log( "parent().parent() id = " + $(this).parent().parent().attr("id") ) ;
		// console.log( $(this).parent().parent().find("ul li").length ) ;

		// add content to the new tab
		tabsdiv.append('<div id="' + String.fromCharCode(97 + nextTabNo) + '">' +
				  renderTable() + '</div>');

		// create a new tab
		tabslist.append('<li><a href="#' + String.fromCharCode(97 + nextTabNo) + '">' +
				  'Tab ' + (nextTabNo + 1) + ' <span id="span' + nextTabNo + '" class="remove-tab" aria-hidden="true">&times;</span></a></li>'); // do not remove span id

		// add Add Tab and Remove Tab buttons to the new tab
		// $("#" + String.fromCharCode( 97+ntabs ) ).append( 
//		$("#" + String.fromCharCode(97 + nextTabNo)).append(
//				  '<button class="add-tab">Add Tab</button> ' +
//				  '<button class="remove-tab">Remove Tab</button>');

		// refresh the tab structure to make the newly added components appear
		$("#myTabs").tabs("refresh");

		// add click handler to all buttons with class add-tab
		// note that this statement must be executed AFTER the tabs structure is refreshed
		// $("#" + String.fromCharCode( 97+ntabs ) + " .add-tab").click( AddTabButtonClickHandler ) ;
		// $("#" + String.fromCharCode( 97+ntabs ) + " .remove-tab").click( RemoveTabButtonClickHandler ) ;
//		$("#" + String.fromCharCode(97 + nextTabNo) + " .add-tab").click(AddTabButtonClickHandler);
		$("#span" + nextTabNo).click(RemoveTabButtonClickHandler);

		tabsdiv.tabs('option', 'active', totalTabs); // set this tab to be focused
		// increment number of next tab to add
		nextTabNo++;
		totalTabs++;
	};

// this function is executed when an add-tab button is clicked
	var RemoveTabButtonClickHandler = function() {
//		console.log("this: ");
//		console.log($(this));

		// remove tab 
//		console.log($(this).parent().context.getAttribute("id").slice(4));
		var id = Number($(this).parent().context.getAttribute("id").slice(4));

//		$(this).remove();
		$(this).parent().parent().remove();

//		// remove tab itself        
//		var id = $(this).attr("id");
//		// console.log( "need to remove tab with href = #" + id ) ;
		var tabToRemove = String.fromCharCode(97 + id);
//		// console.log( "tabToRemove = " + tabToRemove.html() ) ;
		$("#" + tabToRemove).remove();

		// refresh the tab structure to make the newly added components appear
		$("#myTabs").tabs("refresh");
		totalTabs--; // this tab has now been removed 
		tabsdiv.tabs('option', 'active', totalTabs - 1); // set this tab to be focused (next tab down)
	};


//	// add the Add Tab button click handler to all All Tab buttons
//	$(".add-tab").click(AddTabButtonClickHandler);
//
//	// add the Add Tab button click handler to all All Tab buttons
	$(".remove-tab").click(RemoveTabButtonClickHandler);

});

var validation = function(event) {
	// preform validation here
	resetForm(); // reset all errors fields and close error messages

	// get the value from all fields
	startVal1 = parseInt($("#startVal1").val());
	endVal1 = parseInt($("#endVal1").val());
	startVal2 = parseInt($("#startVal2").val());
	endVal2 = parseInt($("#endVal2").val());
	errorMessage = "The red highlighted fields have errors: ";
	var errorOccurred = false;

	console.log(startVal1 + " " + endVal1 + " " + startVal2 + " " + endVal2);

	// if one of the fields does not have a value
	if (!$.isNumeric(startVal1)) {
		$("#startVal1Group").addClass("has-error");
		errorMessage += "Multiplier(start value) ";
		errorOccurred = true;
	}
	if (!$.isNumeric(endVal1)) {
		$("#endVal1Group").addClass("has-error");
		errorMessage += "Multiplier(end value) ";
		errorOccurred = true;
	}
	if (!$.isNumeric(startVal2)) {
		$("#startVal2Group").addClass("has-error");
		errorMessage += "Multiplicand(start value) ";
		errorOccurred = true;
	}
	if (!$.isNumeric(endVal2)) {
		$("#endVal2Group").addClass("has-error");
		errorMessage += "Multiplicand(end value) ";
		errorOccurred = true;
	}

	// if the start value is greater than the end value 
	if (startVal1 > endVal1) {
		$("#startVal1Group").addClass("has-error");
		$("#endVal1Group").addClass("has-error");
		errorMessage += "Multiplier(start value) must be smaller than its (end value) ";
		errorOccurred = true;
	}
	if (startVal2 > endVal2) {
		$("#startVal2Group").addClass("has-error");
		$("#endVal2Group").addClass("has-error");
		errorMessage += "Multiplicand(start value) must be smaller than its (end value) ";
		errorOccurred = true;
	}
	// if an any field is not numeric
	if (errorOccurred) {
		$("#multForm-error").removeClass("hidden");
		$("#multForm-errorMessage").html(errorMessage);
		return false;
	} else {
		$("#myModal").modal('hide');
		return true;
		resetForm();
	}

};
// resets all error conditions and closes error messages
var resetForm = function() {
	$("#multForm-error").addClass("hidden"); // hide alert message
	$("#startVal1Group").removeClass("has-error");
	$("#endVal1Group").removeClass("has-error");
	$("#startVal2Group").removeClass("has-error");
	$("#endVal2Group").removeClass("has-error");
};

// create and append multiplication table
var renderTable = function() {
	var tableString = "";
	var tableHead = "";
	var tableBody = "";
	tableString += "<div class='table-responsive'>";
	tableString += "<table class='table table-condensed table-striped'>";
	tableString += "<thead>";
	tableString += "<th>";
	tableString += "</th>";
	// TABLE HEAD
	for (var i = startVal1; i <= endVal1; i++) {
		tableHead += "<th>";
		tableHead += i;
		tableHead += "</th>";
	}
	tableString += tableHead;
	tableString += "</thead>";

	// TABLE BODY
	for (var x = startVal2; x <= endVal2; x++) {
		tableBody += "<tr>";
		tableBody += "<td>";
		tableBody += x;
		tableBody += "</td>";

		for (var y = startVal1; y <= endVal1; y++) {
			tableBody += "<td>";
			tableBody += (y * x);
			tableBody += "</td>";
		}
		tableBody += "</tr>";
	}
	tableString += tableBody;
	tableString += "</table>";
	tableString += "</div>";

	return tableString;
//	$("#myTable").html(tableString);
};

