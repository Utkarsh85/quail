var buildModel= require('./build/build');

module.exports= function () {
	var models = require('../utils/getModels');

	// console.log(models);
	var ReturnFullModel={};
	for(var modelName in models)
	{
		ReturnFullModel[modelName] = buildModel(modelName,models[modelName]);
	}

	return ReturnFullModel;
}