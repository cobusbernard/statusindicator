var express = require('express'),
    zendesk = require('./routes/zendesk.js');
 
var app = express();
 
app.get('/zendesk/test', zendesk.test);
app.get('/zendesk/config', zendesk.config);
 
app.listen(3000);
console.log('Listening on port 3000...');
