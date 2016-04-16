var models= require('../../utils/getModels');

module.exports= function (req,res,next) {
	if(req.options.action === "update")	
	{
		if(models[req.options.controller].hasOwnProperty('safeAttributes'))
		{
			models[req.options.controller].safeAttributes.map(function (val) {
				delete req.body[val];
			});
			next();
		}
		else
		{
			next();
		}
	}
	else
	{
		next();
	}
}