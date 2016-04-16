var findOne= require('../../blueprint/findOne');
module.exports= function (app,models,controllers) {
	for(var model in models)
	{
		var lowerCaseModel= model.toLowerCase();
		var controllerName= model+'Controller';

		if(controllers[controllerName] && controllers[controllerName].hasOwnProperty('findOne'))
			app['get']('/'+lowerCaseModel+'/:id',controllers[controllerName].findOne);
		else
			app['get']('/'+lowerCaseModel+'/:id',findOne);
	}

	return app;
}