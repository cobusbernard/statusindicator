var sqlite3 = require("sqlite3"),
	fs = require("fs");

var dbName = 'database.db';
db = new sqlite3.Database(dbName);

fs.exists(dbName, function (exists) {
  if (!exists) {
	db = new sqlite3.Database(dbName);
    console.info('Creating database. This may take a while...');
    fs.readFile('scripts/database.sql', 'utf8', function (err, createScript) {
      if (err) {
		console.error('Could not create database.');
		throw err;
	  }
      db.exec(createScript, function (err) {
        if (err) throw err;
        console.info('Created DB.');
      });
    });
  }
});

db.each("SELECT id, config_value FROM Config ORDER BY id", 
	function(err, row) {
		GLOBAL.configs[row.id] = JSON.parse(row.config_value);
		console.info(row);
	},
	function()
	{
		console.info("Loaded db config. ");
		console.info(GLOBAL.configs);
		db.close();
	}
);

exports.getconfig = function(res) {
	var db = new sqlite3.Database(dbName);
	var configs = [];
	var i = 0;
	db.each("SELECT config_value FROM Config ORDER BY id", 
		function(err, row) {
			configs[i++] = JSON.parse(row.config_value);
		},
		function()
		{
			GLOBAL.configs = configs;
			db.close();
			res.send({ response: GLOBAL.configs});
		}
	);
}

exports.updateconfig = function(req, res) {
	GLOBAL.configs = req.body.configs;
	var db = new sqlite3.Database(dbName);
	
	db.run("DELETE FROM config", function() {	
		var stmt = db.prepare("INSERT INTO config VALUES (?, ?)");
		for (var i = 0; i < req.body.configs.length; i++){
			stmt.run((i+1), JSON.stringify(req.body.configs[i]));
		}
		stmt.finalize();
		db.close();		
		res.send({response: "Configs updated."});
	});
}