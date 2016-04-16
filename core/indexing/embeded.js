// Returns array of promises for embeded models _id property to be unique and sparse

module.exports= function (modelName,embeded) {
	

	var db= require('../db/mongodb/mongodb').getDb();

	return db.collection(embeded).indexes()
	.then(function (indices) {
		// console.log("Indices are",indices,modelName);
		return indices.map(function (val) {
			return Object.keys(val.key)[0];
		});
	})
	.then(function (keys) {
		// console.log(keys,keys.indexOf(modelName+'._id'));
		if(keys.indexOf(modelName+'._id') >=0)
		{
			return null;
		}

		else
		{
			var ensureIndexObj={};
			ensureIndexObj[modelName+'._id']=1;
			// console.log(ensureIndexObj);
			return db.ensureIndex(embeded,ensureIndexObj,{unique:true,sparse:true});
		}
	})
}