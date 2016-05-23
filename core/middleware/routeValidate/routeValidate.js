var Ajv = require('ajv');

module.exports= function (req,res,next) {
	
	req.validate= function (schema,obj,isRequired) {

		var v = new Ajv();

		var buildSchema={
				type:"object",
			};

		var required=[];
		for(var key in schema)
		{
			required.push(key);
		}

		//If required is defined then work accordingly, or by defualt the required is set to true
		if(isRequired)
			buildSchema.required= required;
		else if(typeof(isRequired) === "undefined")
			buildSchema.required= required;

		buildSchema.properties= schema;

		if(obj)
			var isValid = v.validate(buildSchema,obj);
		else			
			var isValid = v.validate(buildSchema,req.Params);

		if(!isValid)
			throw v.errors;
	}

	return next();
}