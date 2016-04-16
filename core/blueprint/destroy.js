var Models= require('../model/model')();

module.exports= function (req,res,next) {

	if(!req.params.hasOwnProperty('id'))
	{
		return res.status(400).json({err:"no id provided"});
	}

	console.log(req.params);

	Models[req.options.controller].destroy(req.params.id)
	.then(function (model_destroyed) {
		return res.json(model_destroyed);
	})
	.catch(function (err) {
		return res.status(400).json(err);
	});
}