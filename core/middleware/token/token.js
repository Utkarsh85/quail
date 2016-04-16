var AclVerify= require('../../utils/AclVerify');
var TokenLib= require('../../utils/tokenCreator');

module.exports= function (req,res,next) {

	//has auth-token header
	if(req.headers.hasOwnProperty('authorization'))
	{
		var token=req.headers['authorization'].split('Bearer ')[1];

		if(!TokenLib.verify(token))
			return res.status(403).json({msg:"Forbidden Access"});

	    var decoded= TokenLib.payload(token);

	    if(decoded.code != 4001)
	    	return res.status(403).json("Token not verified");

	    if( AclVerify.verify({auth:'authenticated',controller:req.options.controller, action:req.options.action,relation:req.options.alias}) )
	    {
			req.user={};
			req.user.id=decoded.base;
			return next();
	    }
	    else
	    	return res.status(403).json("Forbidden");
	}

	//No auth-token header
	else
	{
		if( AclVerify.verify({auth:'not_authenticated',controller:req.options.controller, action:req.options.action,relation:req.options.alias}) )
	    {
			return next();
	    }
	    else
	    	return res.status(403).json("Forbidden");
	}

}