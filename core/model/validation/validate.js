var Promise= require('bluebird');
var Ajv = require('ajv');
module.exports= function (modelname,model,instance) {

	//make measure for the references
	if(model.hasOwnProperty('reference'))
	{
		for(var ref in model.reference)
		{
			model.schema.properties[ref]= {type:"string"};
		}
	}

	return new Promise(function (resolve,reject) {
		var v = new Ajv({ useDefaults: true });
		var isValid = v.validate(model.schema, instance);

		if(isValid)
		{
			resolve(null);
		}
		else
		{
			reject(v.errors);
		}

	});
}