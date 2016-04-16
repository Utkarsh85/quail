var update= require('../../blueprint/update');
module.exports= function (app,models,controllers) {
	for(var model in models)
	{
		var lowerCaseModel= model.toLowerCase();
		var controllerName= model+'Controller';

		if(controllers[controllerName] && controllers[controllerName].hasOwnProperty('update'))
			app['put']('/'+lowerCaseModel+'/:id',controllers[controllerName].update);
		else
			app['put']('/'+lowerCaseModel+'/:id',update);
	}

	return app;
}