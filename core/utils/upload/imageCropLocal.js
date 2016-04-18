var Promise= require('bluebird');
var gm = require('gm');
var filename = require('./filename');
var mime= require("mime-types");

module.exports= function (filesObj) {
	
	var PromiseArr= filesObj.map(function (fileObj) {
		return new Promise(function (resolve,reject) {
			var newFileName= './upload/'+filename()+'.'+mime.extension(fileObj.file.mimetype);

			if(!fileObj.hasOwnProperty('file') || !fileObj.hasOwnProperty('w') || !fileObj.hasOwnProperty('h')|| !fileObj.hasOwnProperty('top') || !fileObj.hasOwnProperty('left') || !fileObj.w || !fileObj.h || !fileObj.top || !fileObj.left)
			{
				reject({err:'Required parameters w, h, top, left not supplied'});
			}

			var resize= fileObj.resize || 60;
     		gm(fileObj.file.buffer)
     		.crop(fileObj.w, fileObj.h, fileObj.top, fileObj.left)
			.resize(resize,resize)
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