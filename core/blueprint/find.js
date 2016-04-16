var Models= require('../model/model')();
module.exports= function (req,res,next) {

	var query=req.query,sort,skip,limit;

	if(req.query.hasOwnProperty('sort'))
	{
		sort=req.query.sort;
	}

	if(req.query.hasOwnProperty('skip'))
	{
		skip=req.query.skip;
	}

	if(req.query.hasOwnProperty('limit'))
	{
		limit=req.query.limit;
	}

	if(sort || skip || limit)
	{
		query= req.query.query || {}; 
	}

	console.log(query);
	Models[req.options.controller].find(query,sort,limit,skip)
	.then(function (model_found) {
		return res.json(model_found);
	})
	.catch(function (err) {
		console.log(err);
		return res.status(400).json(err);
	})
}