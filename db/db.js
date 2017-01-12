   /**
    * A module that establish db connection, create db views and exports db instance.
    */

    var logger = require('../logger/logger');
    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];
    var dbop = require('./dbutils.js')

    var nano;
  
    var _db;

    var view = {
          "_id":"_design/reports",
          "language": "javascript",
          "views":
          {
            "all": {
              "map": "function(doc) { emit(doc._id, doc) }"
            },
           "by_date": {
             "map": "function(doc) { emit(doc.CreatedTime, doc) }"
            }
          }
        } 

    module.exports = {

      connectToServer: function( callback ) {
        nano = require('nano')(config.database.url);
        nano.db.get(config.database.db, function(err, body) {
          if(err) {
            logger.debug("database doesn't exists, creating auditserverdb database...");
            nano.db.create(config.database.db, function(err, body) {
              if(err){
                logger.error("Could not create database!", err);
              }
              else{
                _db = nano.use(config.database.db);
                logger.debug("created database !");
                dbop.insertDocument(view, function(err, body){
                      if(err){
                        logger.error(err);
                      }else{
                        logger.debug("created design document to retrieve reports - _design/reports");
                      }
                });
                return callback(err);
              }
            });
          } else {
            logger.debug("auditserverdb already exists!");
            _db = nano.use(config.database.db);
            _db.get('_design/reports', function(err, body) {
                  if(err){
                    logger.debug("design doc to retrive reports doesn't exist, creating _design/reports!");
                    dbop.insertDocument(view, function(err, body){
                      if(err){
                        logger.error(err);
                      } else{
                        logger.debug("created design document - _design/reports");
                      }
                    });
                  }else {
                    logger.debug("_design/reports already exists");
                  }
                });
            return callback(err);
          }
        });
      },

      getDb: function() {
        return _db;
      }
    };
