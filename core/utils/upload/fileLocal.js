var Promise= require('bluebird');
var fs = require('fs');
var filename = require('./filename');
var mime= require("mime-types");

module.exports= function (files) {
	
	var PromiseArr= files.map(function (file) {
		return new Promise(function (resolve,reject) {
			var newFileName= './upload/'+filename()+'.'+mime.extension(file.mimetype);

			fs.writeFile(newFileName, file.buffer,function (err,done) {
				if(err)
					reject(err);
				else
					resolve(newFileName);
			});
		});
	});

	return Promise.all(PromiseArr);
}