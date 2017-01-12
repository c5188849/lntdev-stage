/**
 * @file Index file which includes available api routes.
 */

var clientstatus = require('./clientstatus');
var reports = require('./reports');
var serverconfig = require('./serverconfig');
var logs = require('./logs');


exports.client = clientstatus.storeClientStatus;
exports.reports = reports.getReportData;
exports.server = serverconfig.getServerConfig;
exports.logs = logs.getLogs; 