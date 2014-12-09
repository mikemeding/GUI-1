/* 
 *  Michael Meding
 *  CREDIT: Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2014 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  
 */

"use strict";  // to ensure that all variables are declared before use

// add one to the numeric string selected by the AngularJS template
myApp.filter("increment", function () {
	/**
	 *  @param num the string selected by the AngularJS template, which should be a number
	 *                note that JavaScript reports the type as "number", not "string"
	 *  @param inc the increment to add to str
	 */
	return function (num, inc) {
		// if the first parameter is invalid, return a blank string
		if (typeof (num) === "undefined" || typeof (num) !== "number") {
			return 0;
		}
		// if the first parameter is not a number, return 0
		else if (typeof (inc) !== "undefined" &&
				  (typeof (inc) !== "number" || isNaN(inc))) {
			return 0;
			// else add one to the parameter and return the result
		} else {
			// if the second parameter is missing or invalid, set it 1
			if (typeof (inc) === "undefined") {
				inc = 1;
			}
			// return the incremented number
			return num + inc;
		}
	}
});

// in the event that a data field is missing
myApp.filter("missingData", function () {
	/**
	 *  @param str the string selected by the AngularJS template
	 */

	//From:	http://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
	function isBlank(str) {
		return (!str || /^\s*$/.test(str));
	}

	return function (str) {
		if (isBlank(str)) {
			return '(no data)';
		} else {
			return str;
		}
	}
});
