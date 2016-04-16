// Returns array of promises for models unique property to be unique (Not for Embeded Models)

module.exports= function (modelName,attrs) {
	
	if(attrs.length >0)
	{
		var db= require('../db/mongodb/mongodb').getDb();

		var PromiseArr= attrs.map(function (uniqueAttr) {

			return db.collection(modelName).indexes()
			.then(function (indices) {
				return indices.map(function (val) {
					return Object.keys(val.key)[0];
				});
			})
			.then(function (keys) {
				// console.log("From Unique",keys,keys.indexOf(uniqueAttr));
				if(keys.indexOf(uniqueAttr) >=0)
				{
					return null;
				}

				else
				{
					var ensureIndexObj={};
					ensureIndexObj[uniqueAttr]=1;
					// console.log("Ensure Index Object",ensureIndexObj);
					return db.ensureIndex(modelName,ensureIndexObj,{unique:true,sparse:true});
				}
			})
		});

		return PromiseArr;
	}

	else
		return [];

}