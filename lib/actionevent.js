var fs = require('fs');
/*
var	lame = require('lame'),
	Speaker = require('speaker'),
	wav = require('wav');
*/
exports.playsound = function(filename) {
	var ismp3 = filename.indexOf("mp3") !== -1;
	/*
	fs.createReadStream(filename)
		.pipe(ismp3 ? new lame.Decoder() : new wav.Reader())
		.on('format', function (format) {
			this.pipe(new Speaker(format));
		});
		*/
	console.info("Playing sound: " + filename);
});
