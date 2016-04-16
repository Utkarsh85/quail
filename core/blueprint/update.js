var Models= require('../model/model')();
module.exports= function (req,res,next) {

	if(!req.params.hasOwnProperty('id'))
	{
		return res.status(400).json({err:"no id provided"});
	}

	Models[req.options.controller].update(req.params.id,req.body)
	.then(function (model_updated) {
		return res.json(model_updated);
	})
	.catch(function (err) {
		return res.status(400).json(err);
	});
}