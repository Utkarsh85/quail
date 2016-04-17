var cors= require('cors');

module.exports= function (app) {

	var corsConfig= require( require('path').resolve('./config/cors') );
	if(corsConfig)
	{
		app.options('*', cors(corsConfig));
		app.use(cors(corsConfig));
	}
	// else
	// {
	// 	app.options('*', cors());
	// 	app.use(cors());
	// }
	return app;
}