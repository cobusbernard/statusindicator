var zendesk = require('node-zendesk'),
    fs      = require('fs'),
	db 		= require('./database');

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

exports.opentickets = function(res) {
	 client.search.query('status:open', function (err, count, responseList) {
	  console.log('parsing response ' + count);
	  if (err) {
		console.log(err);
		return;
	  }
	  GLOBAL.opentickets = count;
	});
};

exports.withsubject = function(subject) {
	 client.search.query('status:open subject: """' + subject + '"""', function (err, count, responseList) {
	  console.log('parsing response');
	  if (err) {
		console.log(err);
		return;
	  }
	  return JSON.stringify(count, null, 2, true);
	});
};

exports.withpriority = function(priority) {
	 client.search.query('status:open priority: ' + priority, function (err, count, responseList) {
	  console.log('parsing response');
	  if (err) {
		console.log(err);
		return;
	  }
	  return JSON.stringify(count, null, 2, true);
	});
};

exports.withsubmitter = function(submitter) {
	 client.search.query('status:open submitter: ' + submitter, function (err, count, responseList) {
	  console.log('parsing response');
	  if (err) {
		console.log(err);
		return;
	  }
	  return JSON.stringify(count, null, 2, true);
	});
};

exports.withrequester = function(requester) {
	 client.search.query('status:open requester: ' + requester, function (err, count, responseList) {
	  console.log('parsing response');
	  if (err) {
		console.log(err);
		return;
	  }
	  return JSON.stringify(count, null, 2, true);
	});
};