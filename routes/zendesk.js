var zendeskapi = require("../lib/zendesk-api"),
	db = require("../lib/database");

//------------- GET -------------//
exports.poll = function(req, res) {
	res.send({ response: "Poll started." });
	
};

exports.getconfig = function(req, res) {
	db.getconfig(res); 
};

exports.getstatus = function(req, res) {
	console.info(GLOBAL.configs);
	zendeskapi.opentickets(res);    
};
//------------- GET -------------//

//------------- POST -------------//
exports.postconfig = function(req, res) {	
	db.updateconfig(req, res);
};
//------------- POST -------------//
