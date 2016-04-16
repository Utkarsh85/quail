var Ajv = require('ajv');

module.exports= function (req,res,next) {
	
	req.validate= function (schema) {

		var v = new Ajv();

		var buildSchema={
				type:"object",
			};

		var required=[];
		for(var key in schema)
		{
			required.push(key);
		}

		buildSchema.required= required;
		buildSchema.properties= schema;

		var isValid = v.validate(buildSchema,req.body);

		if(!isValid)
			throw v.errors;
	}

	return next();
}