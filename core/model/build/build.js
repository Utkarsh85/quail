var dbCore= require('require-all')( require("path").resolve(__dirname,'../dbCore') );
var validate= require('../validation/validate');
var buildFind= require('./buildCrud/buildFind');

module.exports= function (modelName,model) {

	var buildFindBindFunc= buildFind.bind(null,modelName,model);
	
	return{

		model: model,
		modelName: modelName,
		
		find: function (query) {
			return new buildFindBindFunc(query);
		},

		findOne : function (query) {
			if(!model.hasOwnProperty('embeded'))
			{
				if(model.hasOwnProperty('noProjection') && Array.isArray(model.noProjection))
				{
					var projectionObj={};
					model.noProjection.map(function (val) {
						projectionObj[val]=0;
					});
					return dbCore.findOne(modelName,query,projectionObj);
				}
				else
					return dbCore.findOne(modelName,query);
			}
			else
			{
				return dbCore.findOneEmbeded(modelName,query,model.embeded);
			}
		},

		create: function (obj,embedParentId) {
			delete obj._id;
			delete obj.parentId;

			if(!model.hasOwnProperty('embeded'))
			{
				return validate(modelName,model,obj)
				.then(function () {
					if(typeof(model.autoCreatedAt)=="undefined" || model.autoCreatedAt)
					{
						obj.createdAt= new Date();
					}

					if(typeof(model.autoUpdatedAt)=="undefined" || model.autoUpdatedAt)
					{
						obj.updatedAt= new Date();
					}
					return dbCore.create(modelName,obj);
				});
			}
			else
			{
				return validate(modelName,model,obj)
				.then(function () {
					// return dbCore.create(modelName,obj);
					if(typeof(model.autoCreatedAt)=="undefined" || model.autoCreatedAt)
					{
						obj.createdAt= new Date();
					}

					if(typeof(model.autoUpdatedAt)=="undefined" || model.autoUpdatedAt)
					{
						obj.updatedAt= new Date();
					}
					return dbCore.createEmbeded(modelName,obj,model.embeded,embedParentId);
				});
			}
		},

		update: function (selector,obj) {
			delete obj._id;

			if(!model.hasOwnProperty('embeded'))
			{
				return validate(modelName,model,obj)
				.then(function () {
					if(typeof(model.autoUpdatedAt)=="undefined" || model.autoUpdatedAt)
					{
						obj.updatedAt= new Date();
					}
					return dbCore.update(modelName,selector,obj);
				});
			}
			else
			{
				return validate(modelName,model,obj)
				.then(function () {
					if(typeof(model.autoUpdatedAt)=="undefined" || model.autoUpdatedAt)
					{
						obj.updatedAt= new Date();
					}
					return dbCore.updateEmbeded(modelName,selector,obj,model.embeded);
				});
			}
		},

		destroy: function (selector) {
			if(!model.hasOwnProperty('embeded'))
			{
				// console.log("selector=",selector,typeof(selector));
				return dbCore.destroy(modelName,selector);
			}
			else
			{
				return dbCore.destroyEmbeded(modelName,selector,model.embeded);
			}
		},

		populate: function (obj,fields) {
			return dbCore.populate(modelName,model,obj,fields);
		},

		native: function () {
			var db = require( '../../db/mongodb/mongodb' ).getDb().collection(modelName);
			return db;
		}
	}
}