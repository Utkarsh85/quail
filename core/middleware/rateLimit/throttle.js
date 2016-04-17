module.exports= function (options) {
	var rateLimitConfig= require( require('path').resolve('./config/rateLimit') );

	if(!rateLimitConfig)
		return false;
	else
	{
		if(rateLimitConfig.hasOwnProperty('routes') && rateLimitConfig.routes.hasOwnProperty(options.controller) && rateLimitConfig.routes[options.controller].hasOwnProperty(options.action) && rateLimitConfig.routes[options.controller][options.action])
		{
			console.log('Is throttling');
			return true;
		}
		else
		{
			return false;
		}
	}
}