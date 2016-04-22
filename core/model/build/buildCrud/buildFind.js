var dbCore= require('require-all')( require("path").resolve(__dirname,'../../dbCore') );

var findEmbeded= function (modelName,model,query) {
	this.modelName=modelName;
	this.model=model;
	this.query= query;
}

findEmbeded.prototype.limit = function(limit) {
	this.limit= limit;
	return this;
};

findEmbeded.prototype.sort = function(limit) {
	this.limit= limit;
	return this;
};

findEmbeded.prototype.skip = function(limit) {
	this.limit= limit;
	return this;
};

findEmbeded.prototype.embededId = function(id) {
	this.embededId= id;
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
			return dbCore.find(this.modelName,this.query,projectionObj,this.sort,this.limit,this.skip);
		}
		else
			return dbCore.find(this.modelName,this.query,null,this.sort,this.limit,this.skip);
	}
	else
	{
		return dbCore.findEmbeded(this.modelName,this.query,this.model.embeded,this.sort,this.limit,this.skip,this.embededId);
	}
};

module.exports= findEmbeded;