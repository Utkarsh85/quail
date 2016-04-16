module.exports= function () {
	var Promise= require('bluebird');
	var models= require('../utils/getModels');

	var PromiseArr=[];
	for(var model in models)
	{
		if(models[model].hasOwnProperty('embeded'))
		{
			var embededPromiseArr=require('./embeded')(model,models[model].embeded);

			PromiseArr.push(embededPromiseArr);
		}

		if(models[model].hasOwnProperty('unique') && models[model].hasOwnProperty('embeded'))
		{
			var uniquePromiseArr=require('./embededUnique')(model,models[model].embeded,models[model].unique);

			uniquePromiseArr.map(function (val) {
				PromiseArr.push(val);
			});
		}

		if(models[model].hasOwnProperty('unique') && !models[model].hasOwnProperty('embeded'))
		{
			var uniquePromiseArr=require('./unique')(model,models[model].unique);

			uniquePromiseArr.map(function (val) {
				PromiseArr.push(val);
			});
		}
	}

	return Promise.all(PromiseArr);
}