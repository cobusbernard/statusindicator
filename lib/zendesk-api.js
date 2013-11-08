var zendesk = require('node-zendesk'),
    fs      = require('fs'),
	db 		= require('./database'),
	utils	= require('./utils'),
	actionevent = require("../lib/actionevent.js"),
	sleep 	= require('sleep');

var client = new Object();

fs.exists('credentials.txt', function (exists) {
  console.info('Setting up Zendesk credentials.');
  if (exists) {
    fs.readFile('credentials.txt', 'utf8', function (err, credentials) {
      if (err) {
		console.error('Could not read credentials.');
		throw err;
	  }
      var username = credentials.split(':')[0];
	  var token = credentials.split(':')[1];
	  var subdomain = credentials.split(':')[2];
	  client = zendesk.createClient({
		  username:  username,
		  token:  token,
		  remoteUri: 'https://' + subdomain + '.zendesk.com/api/v2'
		});
		
		client.users.auth(function (err, res, result) {
		if (err) {
			console.log(err);
			return;
		}
		if (!result.verified)
			console.error('Unable to verify your credentials.');
		else
			console.info('Zendesk credentials verified.');
		});
    });
  } else {
	console.error('Could not load your Zendesk credentials, please ensure the file \'credentials.txt\' exists in the project with contents: <username>:<token>:<subdomain>');
  }  
});

exports.opentickets = function(quantityTrigger) {
	client.search.query('status:open', function (err, count, responseList) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('parsing open tickets: ' + responseList.length);
		GLOBAL.stats.opentickets = count;
		if (typeof quantityTrigger != 'undefined') {
			var openTriggerCount = parseInt(quantityTrigger.triggervalue);
			if (openTriggerCount <= count) 
				actionevent.playsound(quantityTrigger.sound);
		}
	});
};

exports.withsubject = function(subjectTrigger) {
	console.info('getting tickets with subject:' + subjectTrigger.triggervalue);
	var queryString = 'status:open subject:"' + subjectTrigger.triggervalue + '"';
	client.search.query(queryString, function (err, count, responseList) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('parsing subject tickets: ' + responseList.length);
		if (typeof subjectTrigger != 'undefined') {
			GLOBAL.stats.subjects[subjectTrigger.triggervalue] = responseList;
			if (0 > responseList.length) 
				actionevent.playsound(subjectTrigger.sound);
		}
	});
};

exports.withpriority = function(priorityTrigger) {
	 client.search.query('status:open priority:' + priorityTrigger.triggervalue, function (err, count, responseList) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('parsing priority tickets: ' + responseList.length);
		if (typeof priorityTrigger != 'undefined') {
			GLOBAL.stats.priority[subjectTrigger.triggervalue] = responseList;
			if (0 > responseList.length) 
				actionevent.playsound(subjectTrigger.sound);
		}
	});
};

exports.withsubmitter = function(submitterTrigger) {
	console.info('getting tickets with submitter:' + submitterTrigger.triggervalue);
	client.search.query('status:open submitter: ' + submitterTrigger.triggervalue, function (err, count, responseList) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('parsing submitter tickets: ' + responseList.length);
		if (typeof submitterTrigger != 'undefined') {
			GLOBAL.stats.submitter = responseList;
			if (0 > responseList.length) 
				actionevent.playsound(submitterTrigger.sound);
		}
	});
};

exports.withrequester = function(requesterTrigger) {
	console.info('getting tickets with requester:' + requesterTrigger.triggervalue);
	client.search.query('status:open requester: ' + requesterTrigger.triggervalue, function (err, count, responseList) {
		if (err) {
			console.log(err);
			return;
		}
		GLOBAL.stats.requester = responseList;
		if (typeof requesterTrigger != 'undefined') {
			console.log('parsing requester tickets: ' + responseList.length);
			if (0 > responseList.length) 
				actionevent.playsound(requesterTrigger.sound);
		}
	});
};