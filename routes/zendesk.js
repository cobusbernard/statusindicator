var zendeskapi = require("../lib/zendesk-api"),
	db = require("../lib/database");

//------------- Methods -------------//
exports.test = function(req, res) {
    res.send({ response: "Server is up!" });
};

exports.config = function(req, res) {
    res.send({ response: "This is the config response." });
};
//------------- Methods -------------//
