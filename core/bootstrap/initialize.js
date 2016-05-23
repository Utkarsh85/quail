var bodyParser = require('body-parser');

module.exports= function (app) {

	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.use(require('../middleware/busboy/busboy'));
	app= require('../middleware/cors/cors')(app);
	app.use(require('../middleware/aggregateParams/aggregateParams'));

	app.use(require('../middleware/routeValidate/routeValidate'));
	app.use(require('../middleware/routeOptions/routeOptions'));
	app.use(require('../middleware/token/token'));
	app.use(require('../middleware/rateLimit/rateLimit') );
	app.use(require('../middleware/safeAttributes/safeAttributes'));

	app= require('../routeLink/routeLink')(app);

	return app;
}