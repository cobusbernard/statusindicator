var fs = require('fs');

var	lame = require('lame'),
	Speaker = require('speaker'),
	wav = require('wav');

	exports.playsound = function(filename) {
	var file = fs.createReadStream(filename);
	var ismp3 = filename.indexOf("mp3") != -1;
	var reader = ismp3 ? new lame.Decoder() : new wav.Reader();
	console.info('Is mp3: ' + ismp3);
	reader.on('format', function (format) {
		reader.pipe(new Speaker(format));
	});
	file.pipe(reader);
	console.info("Playing sound: " + filename);
};
