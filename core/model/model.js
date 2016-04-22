var buildModel= require('./build/build');
var ObjectID = require('mongodb').ObjectID;
module.exports= function () {
	var models = require('../utils/getModels');

	// console.log(models);
	var ReturnFullModel={};
	for(var modelName in models)
	{
		ReturnFullModel[modelName] = buildModel(modelName,models[modelName]);
	}

	ReturnFullModel.id2bson = function (id) {
			return new ObjectID(id);
	},

	ReturnFullModel.generateId = function () {
		return new ObjectID();
	}
	
	return ReturnFullModel;
}