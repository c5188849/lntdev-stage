/**
 * @file Modules that retrieve client data and sends the reports.
 */

var logger = require('../logger/logger');
var db = require('../db/db');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];


/** 
 * A module that requests the client data with different criterias and sends the response.
 * @module getReportData
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */

function getReportData(req, res, next) {
        if(!req.query.startDate && !req.query.endDate ) {
            logger.info("Query string : no qs passed");
            getClientData(null, null, function (err, data) {
                if(err){
                  logger.error(err)
                }else{
                  res.send(200, data);
                }
            });
        }else {
            logger.info("Query string : ", req.query);
            getClientData(req.query.startDate, req.query.endDate, function (err, data) {
                if(err){
                  logger.error(err)
                }else{
                  res.send(200, data);
                }
            });
        }
        return next();

};


/**
 * A module that retrieves the client data from the database based on provided criteria
 * @module getClientData
 * @param {date} startDate
 * @param {date} endDate
 * @param {function} callback - A callback function to send the response 
 */

function getClientData(startDate, endDate, callback) {

        var database = db.getDb();
        // Get the documents collection

        if(startDate != null && endDate != null) {
            database.view('reports', 'by_date', {startkey: startDate, endkey: endDate}, function (err, result) {
              if (err) {
                logger.error(err);
              } else if (result) {
                logger.debug('Found!', (result.total_rows-result.offset));
              } else {
                logger.debug('No document(s) found with defined "find" criteria!');
              }
              callback(err, result);
            });
        } else {
            database.view('reports', 'all', function (err, result) {
              if (err) {
                logger.error(err);
              } else if (result) {
                logger.debug('Found!', (result.total_rows-result.offset))  ;
              } else {
                logger.debug('No document(s) found with defined "find" criteria!');
              }
              callback(err, result);
            });
        }
      };
  


exports.getClientData = getClientData;
exports.getReportData = getReportData;