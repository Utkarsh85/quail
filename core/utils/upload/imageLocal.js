var Promise= require('bluebird');
var gm = require('gm');
var filename = require('./filename');
var mime= require("mime-types");

module.exports= function (files) {
	
	var PromiseArr= files.map(function (file) {
		return new Promise(function (resolve,reject) {
			var newFileName= './upload/'+filename()+'.'+mime.extension(file.mimetype);

			gm(file.buffer)
			.write(newFileName, function (err) {
				if(err) {
					reject(err);
				}
				resolve(newFileName);
			});

		});
	});

	return Promise.all(PromiseArr);
}