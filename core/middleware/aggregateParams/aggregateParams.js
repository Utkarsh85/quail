var merge = require('deepmerge');

module.exports= function (req,res,next) {
	var params={};

	if(typeof(req.body) === "object")
	{
		params= merge(req.body,params);
	}

	if(typeof(req.params) === "object")
	{
		params= merge(req.params,params);
	}

	if(typeof(req.query) ==="object")
	{
		params= merge(req.query,params);
	}

	req.Params= params;

	return next();
}