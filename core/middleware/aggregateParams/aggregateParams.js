var merge = require('deepmerge');

module.exports= function (req,res,next) {
	var params={};

	if(req.body)
	{
		params= merge(req.body,params);
	}

	if(req.params)
	{
		params= merge(req.params,params);
	}

	if(req.query)
	{
		params= merge(req.query,params);
	}

	
	req.params= params;

	return next();
}