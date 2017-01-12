/**
 * A module that returns the server configurations
 * @module getServerConfig
 */

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

/**
 * Sends server config to the clients
 * @param {object} req 
 * @param {object} res
 * @param {function} next() - calls the next middleware
 */

function getServerConfig(req,res,next)
{
	
	var configObj = {};
	configObj.Version = config.clientConfig.Version;
	configObj.Contact_URL = {};
	configObj.Contact_URL.URL = config.url;
	configObj.Contact_URL.IP_Port = config.server.host + ":"+config.server.port;
	configObj.Contact_Interval = config.clientConfig.Contact_Interval;
	res.send(200,configObj);
	return next();


}


exports.getServerConfig = getServerConfig;