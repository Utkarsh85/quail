var dbCore= require('require-all')( require("path").resolve(__dirname,'../dbCore') );
var validate= require('../validation/validate');

module.exports= function (modelName,model) {
	return{
		model: model,
		modelName: modelName,
		find: function (query,sort,limit,skip) {
			if(!model.hasOwnProperty('embeded'))
			{
				return dbCore.find(modelName,query,sort,limit,skip);
			}
			else
			{
				return dbCore.findEmbeded(modelName,query,model.embeded,sort,limit,skip);
			}
		},

		findOne : function (query) {
			if(!model.hasOwnProperty('embeded'))
			{
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
					if(!model.autoCreatedAt)
					{
						obj.createdAt= new Date();
					}

					if(!model.autoUpdatedAt)
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
					if(!model.autoCreatedAt)
					{
						obj.createdAt= new Date();
					}

					if(!model.autoUpdatedAt)
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
					if(!model.autoUpdatedAt)
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
					if(!model.autoUpdatedAt)
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