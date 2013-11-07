var zendesk = require('node-zendesk'),
    fs      = require('fs');

var a_username = '';
var a_token = '';
	
fs.readFile('./lib/credentials.txt', 'utf8', function (err, data) {
	  console.info('Loading username and token.');
      if (err) {
        console.error('Your username and api key need to be stored in lib/credentials.txt in the format username:token, i.e. john@mycompany.com:SHg7DnIdrt10fx6Yv');
		throw err;
	  }
	  console.info('Found username and token.');
      a_username = data.split(':')[0];
	  a_token = data.split(':')[1];
	  console.info('Found username and token. ' + a_username + '||' + a_token);
    });	
	
var client = zendesk.createClient({
  username:  a_username,
  token:     a_token,
  remoteUri: 'https://22seven.zendesk.com/api/v2'
});

client.users.auth(function (err, res, result) {
console.info('Loaded details: ' + a_username + '::' + a_token);
  if (err) {
    //console.log(err);
    return;
  }
  console.log(JSON.stringify(result.verified, null, 2, true));
});

/*
client.users.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
});
*/