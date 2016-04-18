var Promise= require('bluebird');
var gm = require('gm');
var filename = require('./filename');
var mime= require("mime-types");
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports= function (filesObj) {
	
	var PromiseArr= filesObj.map(function (fileObj) {
		return new Promise(function (resolve,reject) {

			if(!process.env.hasOwnProperty('AWS_ACCESS_KEY_ID') || !process.env.hasOwnProperty('AWS_SECRET_ACCESS_KEY') || !process.env.hasOwnProperty('AWS_REGION'))
			{
				reject({err:'AWS Credentials not supplied'});
			}

			if(!fileObj.hasOwnProperty('file') && !fileObj.hasOwnProperty('bucket'))
			{
				reject({err:'Bucket not supplied'});
			}

			var bucket=fileObj.bucket;
			var acl=fileObj.acl || "public-read";
			var newFileName=filename()+'.'+mime.extension(fileObj.file.mimetype);

			var data = {
				ACL:acl,
				Bucket: bucket,
				Key: newFileName,
				Body: fileObj.file.buffer,
				ContentType: fileObj.file.mimetype
			};

			s3.upload(data, function(err, res) {
				if(err) reject(err);
				resolve(res);
			});

		});
	});

	return Promise.all(PromiseArr);
}