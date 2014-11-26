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
$(document).ready(function () {
	/** BOOTSTRAP VALIDATOR STUFF **/
	var minRange = -256;
	var maxRange = 256;
	$('#myForm').bootstrapValidator({
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
					},
					callback: {
						message: "Range error",
						callback: function (value, validator) {
							return true;
						}
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
					},
					callback: {
						message: "Range error",
						callback: function (value, validator) {
							return true;
						}
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
					},
					callback: {
						message: "Range error",
						callback: function (value, validator) {
							return true;
						}
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
					},
					callback: {
						message: "Range error",
						callback: function (value, validator) {
							return true;
						}
					}
				}
			}
		}

	})
			// LISTENERS
			// sucessful form validation and button pressed
			.on('success.form.bv', function (e) {
				console.log("calling additional validation");
				if (validation()) { // preform number validation
					AddTabButtonClickHandler(); // adds new tab with table

				}

			})
			// every time a field is successfully updated
			.on('success.field.bv', function (e, data) { // updates the global values dynamically
				var value = $("input[name='" + data.field + "']").val();
				if (data.field === "start1") {
					startVal1 = parseInt(value);
				}
				if (data.field === "start2") {
					startVal2 = parseInt(value);
				}
				if (data.field === "end1") {
					endVal1 = parseInt(value);
				}
				if (data.field === "end2") {
					endVal2 = parseInt(value);
				}
				data.bv.disableSubmitButtons(false);
			});
	// REMOVE ALL TABS
	$("#removeTabs").on('click', function () {
		$("[id^='span']").trigger('click'); // trigger click on x for each tab
	});

	/** TAB HANLDER STUFF **/
	$("#myTabs").tabs();
	// the div containing the complete tabs structure
	var tabsdiv = $("#myTabs");
	// the list of tabs
	var tabslist = $("#tab-row");
	// set the number of the next tab to add
	var nextTabNo = tabslist.find("li").length;
	// this function is executed when an add-tab button is clicked
	var AddTabButtonClickHandler = function () {
		// add content to the new tab
		tabsdiv.append('<div id="' + String.fromCharCode(97 + nextTabNo) + '">' +
				renderTable() + '</div>');
		// create a new tab
		tabslist.append('<li><a href="#' + String.fromCharCode(97 + nextTabNo) + '">' +
				startVal1 + "-" + endVal1 + " by " + startVal2 + "-" + endVal2 + ' <span id="span' + nextTabNo + '" class="remove-tab" aria-hidden="true">&times;</span></a></li>'); // do not remove span id
		// refresh the tab structure to make the newly added components appear
		$("#myTabs").tabs("refresh");
		// add click handler to all buttons with class add-tab
		// note that this statement must be executed AFTER the tabs structure is refreshed
		$("#span" + nextTabNo).click(RemoveTabButtonClickHandler);
		tabsdiv.tabs('option', 'active', totalTabs); // set this tab to be focused
		// increment number of next tab to add
		nextTabNo++;
		totalTabs++;
	};
	// this function is executed when the x is clicked on the tab
	var RemoveTabButtonClickHandler = function () {
		// get tab id #	
		var id = Number($(this).parent().context.getAttribute("id").slice(4));
		// remove tab 
		$(this).parent().parent().remove();
		// remove tab content 
		var tabToRemove = String.fromCharCode(97 + id);
		$("#" + tabToRemove).remove();
		// refresh the tab structure to make the newly added components appear
		$("#myTabs").tabs("refresh");
		totalTabs--; // this tab has now been removed 
		tabsdiv.tabs('option', 'active', totalTabs - 1); // set this tab to be focused (next tab down)
	};
	// add the Add Tab button click handler to all All Tab buttons
	$(".remove-tab").click(RemoveTabButtonClickHandler);

	/**
	 * This preforms my additional validation.
	 * @param {type} event
	 * @returns {Boolean}
	 */
	var validation = function (event) {
		// preform validation here
		resetForm(); // reset all errors fields and close error messages

		// get the value from all fields
		errorMessage = "ERROR: ";
		var errorOccurred = false;

//		console.log(startVal1 + " " + endVal1 + " " + startVal2 + " " + endVal2);

		// if the start value is greater than the end value 
		if (startVal1 > endVal1) {
			$("#multiplier-label").addClass("text-danger");
			errorMessage += "Multiplier (start value) must be smaller than its (end value) ";
			$("#myForm").bootstrapValidator('updateStatus', 'start1', 'INVALID', 'callback');
			$("#myForm").bootstrapValidator('updateStatus', 'end1', 'INVALID', 'callback');
			errorOccurred = true;
		}
		if (startVal2 > endVal2) {
			$("#multiplicand-label").addClass("text-danger");
			errorMessage += "Multiplicand (start value) must be smaller than its (end value) ";
			$("#myForm").bootstrapValidator('updateStatus', 'start2', 'INVALID', 'callback');
			$("#myForm").bootstrapValidator('updateStatus', 'end2', 'INVALID', 'callback');
			errorOccurred = true;
		}

		// show error messages if error occured
		if (errorOccurred) {
			if (errorMessage !== "ERROR: ") {
				$("#multForm-error").removeClass("hidden"); // show alert message
				$("#multForm-errorMessage").html(errorMessage);
			}
			return false;
		} else {
			resetForm();
			resetValues();
			return true;
		}

	};
	// resets all error conditions and closes error messages
	var resetForm = function () {
		$('#myForm').data('bootstrapValidator').resetForm(); // reset bootstrap validator classes
		$("#multiplicand-label").removeClass("text-danger");
		$("#multiplier-label").removeClass("text-danger");
		$("#multForm-error").addClass("hidden"); // hide alert message
	};
	var resetValues = function () {
		// reset field values
		$("#startVal1").val('');
		$("#startVal2").val('');
		$("#endVal1").val('');
		$("#endVal2").val('');
	};

	// create and append multiplication table
	var renderTable = function () {
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
	};
});

