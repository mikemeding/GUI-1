"use strict";  // to ensure that all variables are declared before use

// the number of the last column sorted, initialized to the Student Name column
var lastSortColumnNo = 2;
// a flag indicating whether the last sort was ascending (true) or descending (false)
var lastSortDescending = false;

// set up AngularJS module, note that name must be the same as that in the 
//    ng-app attribute of the html tag above
var myApp = angular.module('SubmissionsApp', []);

// set a constant to the JSON file path
myApp.constant("jsonUrl", "json/data.json");

// add business logic to the app controller
myApp.controller('SubmissionsCtrl',
		  /** Read JSON data using Ajax - adapted from Pro AngularJS, p. 149.
			*  @param $scope  the standard AngularJS model scope
			*  @param $http   the built-in AngularJS http object containing the get function
			*  @param jsonURL the app constant containing the JSON file path (defined above)
			*/
					 function ($scope, $http, jsonUrl) {
						 $scope.jsonData = {};              // initialize an object in the model's scope
						 $http.get(jsonUrl)                // perform the Ajax call
									.success(function (data) {      // execute this function if the Ajax succeeds
										$scope.jsonData.data = data;   // set the model's jsonData.data property to the
									})                               //    data returned by the Ajax call
									.error(function (error) {      // execute this function if the Ajax fails
										$scope.jsonData.error = error; // set the model's jsonData.error property to the
									});                             //    error returned by the Ajax call

						 // the following data is not used in the current version of this app
						 $scope.date = new Date();          // get the current date and time
						 // see http://stackoverflow.com/questions/22962468/angularjs-display-current-date

						 // get the creation date and time of the JSON file using an Ajax call to a PHP program
//								$http.get("getFileCreationTime.php?filepath=" + jsonUrl)
//										.success(function (data) {
//											// convert the data returned to a JavaScript integer representing the number of
//											//    milliseconds since the epoch (January 1, 1970 00:00:00 Greenich Mean Time)
//											// this integer can then be used with the AngularJS data formatting filter
//											$scope.dataFileCreationDate = (new Date(data)).getTime();
//										})
//										.error(function (error) {
//											$scope.dataFileCreationDate = error;
//										});

						 // set the initial sort field (student name) and sort order (ascending)
						 $scope.sortField = "student_name";
						 $scope.sortDescending = false;

						 // extract the assignment number for the page title
//						 $scope.assnNo = jsonUrl.substring(6, 7);
						 $scope.assnNo = 9; 

						 /** 
						  *  Sort column clicked in either ascending or descending order.
						  *  Note that this could also be accomplished using the built-in AngularJS orderBy
						  *    filter and manipulating the sort field and reverse parameters.
						  *  Also note that this code could also have been incorporated into the ng-click 
						  *    directives on the table's th elements, but doing it here gave me more central
						  *    control, and I think that this function makes what's going on clearer and 
						  *    therefore easier to maintain.
						  *  @param colNo the number of the column header clicked
						  */
						 $scope.sortColumn = function (colNo) {
							 $scope.sortDescending = lastSortColumnNo === colNo && !lastSortDescending;
							 // true to sort in descending order, false to sort in ascending order
							 // will be false if sorting a new column or last sort was descending
							 if (colNo === 2) {
								 // this is the Student Name column
								 $scope.sortField = "student_name";
								 // the following statement was used in a previous version of this app
								 // before adding the orderBy filter to the ng-repeat directive
								 //    $scope.jsonData.data.RECORDS.sort( sort_by( "student_name", boolSortAscending ) ) ;
							 } else if (colNo === 3) {
								 $scope.sortField = "student_address | upToAtSign";
							 } else if (colNo === 4) {
								 // this is the Submit Date & Time column
								 $scope.sortField = "millisecs";
								 // the following statement was used in a previous version of this app
								 // before adding the orderBy filter to the ng-repeat directive
								 //    $scope.jsonData.data.RECORDS.sort( sort_by( "millisecs", boolSortAscending ) ) ;
							 }
							 // save the sort paramesters for the next click
							 lastSortDescending = $scope.sortDescending;
							 lastSortColumnNo = colNo;
						 };
					 }
		  );

