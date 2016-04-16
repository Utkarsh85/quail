var Models= require('../model/model')();
module.exports= function (req,res,next) {

	if(!req.params.hasOwnProperty('id'))
	{
		return res.status(400).json({err:"no id provided"});
	}

	Models[req.options.controller].findOne(req.params.id)
	.then(function (model_found) {
		return res.json(model_found);
	})
	.catch(function (err) {
		return res.status(400).json(err);
	});
}