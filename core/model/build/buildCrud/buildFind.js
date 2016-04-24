var dbCore= require('require-all')( require("path").resolve(__dirname,'../../dbCore') );

var findEmbeded= function (modelName,model,query) {
	this.modelName=modelName;
	this.model=model;
	this.query= query;
}

findEmbeded.prototype.limit = function(limit) {
	if(limit && !isNaN(parseInt(limit))  && parseInt(limit) >0 )
	{
		this.limitVal= parseInt(limit);
	}
	return this;
};

findEmbeded.prototype.sort = function(sort) {
	if( sort.constructor=== Object || Array.isArray(sort))
	{
		this.sortVal= sort;
	}
	return this;
};

findEmbeded.prototype.skip = function(skip) {
	if( skip && !isNaN(parseInt(skip))  && parseInt(skip) >0 )
	{
		this.skipVal= parseInt(skip);
	}
	return this;
};

findEmbeded.prototype.embededId = function(id) {
	this.embededParentId= id;
	return this;
};

findEmbeded.prototype.exec = function() {

	if(!this.model.hasOwnProperty('embeded'))
	{
		if(this.model.hasOwnProperty('noProjection') && Array.isArray(this.model.noProjection))
		{
			var projectionObj={};
			this.model.noProjection.map(function (val) {
				projectionObj[val]=0;
			});
			return dbCore.find(this.modelName,this.query,projectionObj,this.sortVal,this.limitVal,this.skipVal);
		}
		else
			return dbCore.find(this.modelName,this.query,null,this.sortVal,this.limitVal,this.skipVal);
	}
	else
	{
		return dbCore.findEmbeded(this.modelName,this.query,this.model.embeded,this.sortVal,this.limitVal,this.skipVal,this.embededParentId);
	}
};

module.exports= findEmbeded;