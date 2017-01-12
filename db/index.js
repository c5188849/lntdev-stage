
/**
 * @file Index file which includes all db modules.
 */

var dbutil = require('./dbutils.js');
var db = require('./db.js');


exports.insertDocument =dbutil.insertDocument;
exports.connectDB = db.connectToServer;
exports.getDb = db.getDb;