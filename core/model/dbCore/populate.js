var mongoDB = require('mongodb');
var Promise = require('bluebird');

var findOne= require('./findOne');
var findOneEmbeded= require('./findOneEmbeded');

module.exports= function (modelName,model,obj,fields) {

	var models= require('../../utils/getModels');
	var ModelReference=[];

	if(model.hasOwnProperty('reference'))
	{
		for (var key in model.reference)
		{
			if (obj.hasOwnProperty(key)) {
				var keyvalue={};
				keyvalue.key=key;
				keyvalue.value=model.reference[key].model;
				ModelReference.push(keyvalue);
			};
		}
	}

	// console.log(ModelReference,fields);
	
	if(fields && fields.length > 0)
	{
		ModelReference=ModelReference.filter(function (val) {
			if(fields.indexOf(val.key) >=0)
			{
				return val;
			}
		});
	}
	
	// console.log(ModelReference);

	var PromiseArr=[];	


	ModelReference.map(function (val) {
		if(models[val.value].hasOwnProperty('embeded') )
		{
			PromiseArr.push(findOneEmbeded(val.value,obj[val.key],models[val.value].embeded));
		}
		else
		{
			PromiseArr.push(findOne(val.value,obj[val.key]));
		} 
	});

	return Promise.all(PromiseArr)
	.then(function (res) {
		ModelReference.map(function (val,index) {
			obj[val.key]=res[index];
		});
		// console.log(obj);
		return obj;
	});
}