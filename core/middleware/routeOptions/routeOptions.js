var method2action= require('./matchMethodToAction');
var isID= require('./isID');
var Capitalize= require('./capitalize');
module.exports= function (req,res,next) {
	var options={};

	var splitUrl= req.url.split('?')[0].split('/');

	switch (splitUrl.length) {
		case 2:
			if(splitUrl[1].length > 0)
			{
				options.controller= Capitalize(splitUrl[1]);
				options.action= method2action(req.method);
			}
			break;
		case 3:
			if( isID(splitUrl[2]) )
			{
				options.controller= Capitalize(splitUrl[1]);
				if(req.method === "GET")
				{
					options.action= method2action(req.method+"_ID");					
				}
				else
				{
					options.action= method2action(req.method);				
				}
			}
			else
			{
				options.controller= Capitalize(splitUrl[1]);
				options.action= splitUrl[2];					
			}
			break;
		case 4:
			options.controller= Capitalize(splitUrl[3]);
			options.action= method2action(req.method+"_POPULATE");					
			break;

		case 5:
			options.controller= Capitalize(splitUrl[3]);
			if(req.method === "GET")
			{
				options.action= method2action(req.method+"_POPULATE_ID");					
			}
			else
			{
				options.action= method2action(req.method+"_POPULATE");					
			}
			break;

		default:
			// statements_def
			break;
	}
	req.options= options;
	console.log(options)
	return next();
}