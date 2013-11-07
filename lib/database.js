var sqlite3 = require("sqlite3"),
	fs = require("fs");

fs.exists('database', function (exists) {
  db = new sqlite3.Database('database');
 
  if (!exists) {
    console.info('Creating database. This may take a while...');
    fs.readFile('./database.sql', 'utf8', function (err, data) {
      if (err) throw err;
      db.exec(data, function (err) {
        if (err) throw err;
        console.info('Done.');
      });
    });
  }
});

