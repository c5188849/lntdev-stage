/**
 * A module which exports the tarball containing all the auditserver logs.
 * @module getLogs
 */

var logger = require('../logger/logger');

var targz = require('tar.gz');
var path = require('path');
var mime = require('mime');
var fs = require('fs');


/**
 * Creates a tarball of all the server logs and exports
 * @param {object} req
 * @param {object} res
 * @param {function} next 
 */

function getLogs(req, res, next) {
        logger.info("Exporting logs");

        targz().compress(path.join(__dirname, '../log/debug'), path.join(__dirname, '../tar/AuditServerlogs.tar.gz'))
	        .then(function(){
	    		logger.debug('Created a tallbar');
				var file = path.join(__dirname, '../tar/AuditServerlogs.tar.gz');
				var stat = fs.statSync(file);

				var filename = path.basename(file);
  				var mimetype = mime.lookup(file);

  				res.writeHead(200, {
			        'Content-Type': mimetype,
			        'Content-disposition': 'attachment; filename='+ filename,
			        'Content-Length': stat.size
			    });

			    var stream = fs.createReadStream(file)

			   	stream.pipe(res);
			   	logger.debug("Exported tarball containing logs")
			})
			.catch(function(err){
			    console.log('Something is wrong ', err.stack);
			});

        return next();
};

exports.getLogs = getLogs;
