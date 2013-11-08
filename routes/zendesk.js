var zendeskapi	= require("../lib/zendesk-api"),
	db 			= require("../lib/database"),
	actionevent = require("../lib/actionevent.js"),
	utils 		= require("../lib/utils.js");
	async		= require("async");

actionevent.playsound("sounds/2_2VaderBidding.mp3");
	
//------------- GET -------------//
exports.poll = function(req, res) {
	res.send({ response: "Poll started." });
	
};

exports.getconfig = function(req, res) {
	db.getconfig(res); 
};

exports.getstatus = function(req, res) {
	if (typeof GLOBAL.configs != 'undefined') {
		//Ticket count
		console.info('Getting open tickets config.');
		var quantityTriggers = utils.getMatchingTriggerType("quantity");
		if (typeof quantityTriggers != 'undefined') {
			console.info('Setting open tickets config to: ' + quantityTriggers[0]);
			zendeskapi.opentickets(quantityTriggers[0]);
		}
		
		//Subject tickets
		console.info('Getting subject tickets.');
		var subjectTriggers = utils.getMatchingTriggerType("subject");
		if (typeof subjectTriggers != 'undefined') {
			async.forEach(subjectTriggers, function(value, callback) {
				zendeskapi.withsubject(value);
				}, 
				function(){}
			);
		}
		//Submitter tickets
		console.info('Getting submitter tickets.');
		var submitterTriggers = utils.getMatchingTriggerType("submitter");
		if (typeof submitterTriggers != 'undefined') {
			async.forEach(submitterTriggers, function(value, callback) {
				zendeskapi.withsubmitter(value);
				}, 
				function(){}
			);
		}
		//Requester tickets
		console.info('Getting requester tickets.');
		var requesterTriggers = utils.getMatchingTriggerType("requester");
		if (typeof requesterTriggers != 'undefined') {
			async.forEach(requesterTriggers, function(value, callback) {
				zendeskapi.withrequester(value);
				}, 
				function(){}
			);
		}
	}
	res.send({response: "Configs / data will be refreshed, current values included in this response.", configs: GLOBAL.configs, stats: GLOBAL.stats});
};
//------------- GET -------------//

//------------- POST -------------//
exports.postconfig = function(req, res) {
	db.updateconfig(req, res);
};
//------------- POST -------------//

//----------- HELPER -------------//

//----------- HELPER -------------//