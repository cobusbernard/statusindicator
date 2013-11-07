var zendesk = require('node-zendesk'),
    fs      = require('fs'),
	db 		= require('./database');

var client = zendesk.createClient({
  //debug:     true,
  username:  'someone@somewhere.com',
  token:  'sdfsdfsdfdsf',
  remoteUri: 'https://api.zendesk.com/api/v2'
});

client.users.auth(function (err, res, result) {
  if (err) {
    console.log(err);
    return;
  }
  if (!result.verified)
	console.error('Unable to verify your credentials.');
});

exports.opentickets = function(res) {
	 client.search.query('status:open', function (err, count, responseList) {
	  console.log('parsing response ' + count);
	  if (err) {
		console.log(err);
		return;
	  }
	  res.send({ opentickets: count});
	  //return JSON.stringify(count, null, 2, true);
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

exports.withpriority = function(submitter) {
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