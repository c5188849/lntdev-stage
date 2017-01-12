  /**
   * A module that stores the client status into database
   * @module storeClientStatus
   */

  var logger = require('../logger/logger');
  var dbop = require('../db');
  var utils = require('./utils');
  var env = process.env.NODE_ENV || 'development';
  var config = require('../config/config')[env];
  var dateformat =require('dateformat');


  /**
   *Stores the client status into the database
   *@param {object} req
   *@param {object} res
   *@param {function} next - A callback to trigger next middleware
   *@return {function} next()
   */

  function storeClientStatus(req, res, next) {

      logger.info('inside storeClientStatus');

      var responseObject = {};
      responseObject.version = "1.0";
      responseObject.Contact_Delay = config.clientConfig.Contact_Delay;


      var jsonBody;
      logger.info(req.body)
      try {

          //validate the json request and return error if invalid
          if (!utils.isValidInput(req.body)) {
              res.send(400, null);
              return next();
          }

          var date = new Date();
          var currentDate = dateformat(date, "yyyy-mm-dd");

          req.body.CreatedTime = currentDate;

          dbop.insertDocument(req.body, function (err, row) {
              if (err) {
                console.log(err);
                  res.send(500);
              } else {
                  res.send(201, responseObject);
              }
              return next();
          });

      } catch (e) {
          logger.error(e);
      }
      return next();
  }


  exports.storeClientStatus = storeClientStatus;