var Models= require('../model/model')();
module.exports= function (req,res,next) {

	var parentId;
	if(req.body.hasOwnProperty('parentId'))
	{
		parentId= req.body.parentId;
	}

	if(req.query.hasOwnProperty('parentId'))
	{
		parentId= req.query.parentId;
	}

	if(parentId)
	{

		Models[req.options.controller].create(req.body,parentId)
		.then(function (model_created) {
			return res.json(model_created);
		})
		.catch(function (err) {
			return res.status(400).json(err);
		});
		
	}
	else
	{
		Models[req.options.controller].create(req.body)
		.then(function (model_created) {
			return res.json(model_created);
		})
		.catch(function (err) {
			return res.status(400).json(err);
		});
	}
}