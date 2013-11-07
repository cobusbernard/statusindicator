var express = require('express'),
    zendesk = require('./routes/zendesk.js');
 
var app = express();
app.use(express.bodyParser());

GLOBAL.configs = [];

app.get('/poll', zendesk.getconfig);
app.get('/config', zendesk.getconfig);
app.get('/status', zendesk.getstatus);

app.post('/config', zendesk.postconfig);
 
app.listen(3000);
console.log('Listening on port 3000...');