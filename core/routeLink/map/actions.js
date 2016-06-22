var find= require('../../blueprint/find');
module.exports= function (app,models,controllers) {
	var modelNames=[];
	for(var model in models)
	{
		modelNames.push(model);
		var lowerCaseModel= model.toLowerCase();
		var controllerName= model+'Controller';

		var allSupportedActions= require('../allSupported/allSupported');
		
		for(var key in controllers[controllerName])
		{
			if(allSupportedActions.indexOf(key) <0)
			{
				app['get']('/'+lowerCaseModel+'/'+key,controllers[controllerName][key]);
				app['post']('/'+lowerCaseModel+'/'+key,controllers[controllerName][key]);
				app['put']('/'+lowerCaseModel+'/'+key,controllers[controllerName][key]);
				app['delete']('/'+lowerCaseModel+'/'+key,controllers[controllerName][key]);
			}
		}		
		
	}

	var controllerDerivedFromModel= modelNames.map(function (model) {
		return model+'Controller';
	});

	Object.keys(controllers)
	.filter(function (controllerName) {
		if(controllerDerivedFromModel.indexOf(controllerName) <0)
			return controllerName;
	})
	.map(function (controllerName) {
		var lowerCaseControllerName= controllerName.toLowerCase();
		lowerCaseControllerName= lowerCaseControllerName.split('controller')[0];

		for(var key in controllers[controllerName])
		{
			// console.log(controllerName,' : ',key);
			app['get']('/'+lowerCaseControllerName+'/'+key,controllers[controllerName][key]);	
			app['post']('/'+lowerCaseControllerName+'/'+key,controllers[controllerName][key]);	
			app['put']('/'+lowerCaseControllerName+'/'+key,controllers[controllerName][key]);	
			app['delete']('/'+lowerCaseControllerName+'/'+key,controllers[controllerName][key]);	
		}	
	});

	return app;
}