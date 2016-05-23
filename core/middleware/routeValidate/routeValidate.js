var Ajv = require('ajv');

module.exports= function (req,res,next) {
	
	req.validate= function (schema,Required,obj) {

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
		if(Required && Array.isArray(Required))
			buildSchema.required= Required;

		else if(Required === false)
		{
			
		}

		else if(typeof(isRequired) === "undefined")
			buildSchema.required= required;

		buildSchema.properties= schema;

		// console.log(buildSchema);
		if(obj)
			var isValid = v.validate(buildSchema,obj);
		else			
			var isValid = v.validate(buildSchema,req.Params);

		if(!isValid)
			throw v.errors;
	}

	return next();
}