/**
 * @file validates the json onject with the schema
 * @module isValidInput
 */

var AJV = require('ajv');
var logger = require('../logger/logger');
var isJSON = require('is-json');

/**
 * Validates the json object
 * @param {object} obj - client status
 * @return {bool}  
 */

function isValidInput(obj)
{
	if(isJSON(obj, true)) {
		return true;
	}else {
		return false;
	}

}


exports.isValidInput = isValidInput;