
/**
 * A module that defines database operations
 * @module insertDocument
 */

var logger = require('../logger/logger');
var assert = require('assert');
var db = require('./db.js');


exports.insertDocument = function( document, callback) {
    logger.info('inserting Document into database');	
    var database = db.getDb(); 
    
    // Insert documents
    database.insert(document, function(err, body) {
    
    logger.debug("Inserted a document into the database "
                 + "auditserverdb");
    callback(err, body);
  });
};