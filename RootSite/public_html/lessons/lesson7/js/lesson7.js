//Michael Meding
//mikeymeding@gmail.com (this is my prefered email)
//Student studying Computer Science at the University of Massachusetts Lowell
//Created on: 09/09/2014
//Course Info: 91.461 GUI programming 1 Jesse M. Heines 
//
// This is the javascript to support the lesson6 page

// global start and end values
var startVal1 = 0;
var endVal1 = 0;
var startVal2 = 0;
var endVal2 = 0;

// load form to page when DOM is ready
$(document).ready(function() {
	$("#myForm").load("form.html", function() { // load form HTML to the page
		$("#myModal").modal('show'); // display modal from form.html once loaded

		// LISTENERS
		// when the actual submit button is clicked
		$("#multForm").submit(function() {
			$("#myModal").modal('hide'); // attempt to hide which triggers hide event calling validation
		});

		// when any kind of hide action is preformed on the modal
		$('#myModal').on('hidden.bs.modal', function(event) {
			if (validation()) { // preform number validation
				$("#myModal").modal('hide'); // hide modal completely if validation succedes
//				var tableHTML = renderTable();
//				addTab(tableHTML);
				AddTabButtonClickHandler();

			} else {
				$("#myModal").modal('show'); // rerender modal with errors
			}
		});

	});
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


//var addTab = function(tableHTML) {
//	var tabNumber = $('#tabs li').size() + 1;
//
//	// create the tab
//	$('<li><a href="#tab' + tabNumber + '" data-toggle="tab">Tab ' + tabNumber + '</a>'+
//'<button type=button onclick="removeTab('+"'"+'tab'+tabNumber+"'"+')"><span aria-hidden="true">&times;</span></button></li>').appendTo('#tabs');
//
//	// create the tab content
//	$('<div class="tab-pane" id="tab' + tabNumber + '">' + tableHTML + '</div>').appendTo('.tab-content');
//
//	// make the new tab active
//	$('#tabs a:last').tab('show');
//
//};


$("#tabs").tabs();
// console.log( "parent id = " + $("#a").parent().attr( "id" ) ) ;

// the div containing the complete tabs structure
// var tabsdiv = $(this).parent().parent() ; 
var tabsdiv = $("#tabs");

// the list of tabs
var tabslist = tabsdiv.find("ul");

// set the number of the next tab to add
var nextTabNo = tabslist.find("li").length;

// this function is executed when an add-tab button is clicked
var AddTabButtonClickHandler = function() {
	// console.log( "parent().parent() id = " + $(this).parent().parent().attr("id") ) ;
	// console.log( $(this).parent().parent().find("ul li").length ) ;

	// the number of tabs - made obsolete by nextTabNo
	// var ntabs = tabslist.find("li").length ;
	// console.log( "ntabs = " + ntabs ) ;

	// create a new tab
	tabslist.append('<li><a href="#tab' + nextTabNo + '" data-toggle="tab">Tab ' + nextTabNo + '<button type="button" class="close remove-tab"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></a></li>');

	// add content to the new tab
	tabsdiv.append('<div class="tab-pane" id="tab' + nextTabNo + '">' + renderTable() + '</div>');

	// add Add Tab and Remove Tab buttons to the new tab
	// $("#" + String.fromCharCode( 97+ntabs ) ).append( 
//    $("#" + String.fromCharCode( 97+nextTabNo) ).append( 
//        '<button class="add-tab">Add Tab</button> ' + 
//        '<button class="remove-tab">Remove Tab</button>' ) ;

	// refresh the tab structure to make the newly added components appear
	$("#myTabs").tabs("refresh");

	// add click handler to all buttons with class add-tab
	// note that this statement must be executed AFTER the tabs structure is refreshed
	// $("#" + String.fromCharCode( 97+ntabs ) + " .add-tab").click( AddTabButtonClickHandler ) ;
	// $("#" + String.fromCharCode( 97+ntabs ) + " .remove-tab").click( RemoveTabButtonClickHandler ) ;
//	$("#" + String.fromCharCode(97 + nextTabNo) + " .add-tab").click(AddTabButtonClickHandler);
	$("#" + String.fromCharCode(97 + nextTabNo) + " .remove-tab").click(RemoveTabButtonClickHandler);

	// increment number of next tab to add
	nextTabNo++;
};

// this function is executed when an add-tab button is clicked
var RemoveTabButtonClickHandler = function() {
	// console.log( $(this).parent().attr("id") ) ;

	// remove tab content
	$(this).parent().remove();

	// remove tab itself        
	var id = $(this).parent().attr("id");
	// console.log( "need to remove tab with href = #" + id ) ;
	var tabToRemove = tabslist.find("li a[href='#" + id + "']").parent();
	// console.log( "tabToRemove = " + tabToRemove.html() ) ;
	tabToRemove.remove();

	// refresh the tab structure to make the newly added components appear
	$("#myTabs").tabs("refresh");
};

//// add the Add Tab button click handler to all All Tab buttons
//$(".add-tab").click(AddTabButtonClickHandler);
//
//// add the Add Tab button click handler to all All Tab buttons
//$(".remove-tab").click(RemoveTabButtonClickHandler);


