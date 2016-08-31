module.exports= function (app) {
	var controllers= require('../utils/getControllers');

	var models= require('../utils/getModels');

	app = require('./map/actions')(app,models,controllers);
	app = require('./map/find')(app,models,controllers);
	app = require('./map/findOne')(app,models,controllers);
	app = require('./map/create')(app,models,controllers);
	app = require('./map/update')(app,models,controllers);
	app = require('./map/destroy')(app,models,controllers);

	return app;
}