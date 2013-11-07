var zendeskapi = require("../lib/zendesk-api"),
	db = require("../lib/database"),
	actionevent = require("../lib/actionevent.js");

actionevent.playsound("../sounds/2_2VaderBidding.wav");
	
//------------- GET -------------//
exports.poll = function(req, res) {
	res.send({ response: "Poll started." });
	
};

exports.getconfig = function(req, res) {
	db.getconfig(res); 
};

exports.getstatus = function(req, res) {
	zendeskapi.opentickets();
	res.send({response: "Configs / data will be refreshed, current values included in this response.", configs: GLOBAL.configs, stats: GLOBAL.stats});
};
//------------- GET -------------//

//------------- POST -------------//
exports.postconfig = function(req, res) {	
	db.updateconfig(req, res);
};
//------------- POST -------------//
