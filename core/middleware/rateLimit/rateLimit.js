
module.exports= function (req,res,next) {
	
	var bruteforce= require('./bruteForceObject').getObject();

	var throttle= require('./throttle')(req.options);

	if(throttle)
		return bruteforce.prevent(req, res, next);
	else
		return next();
}