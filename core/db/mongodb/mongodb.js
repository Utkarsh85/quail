var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

  connectToServer: function( callback ) {
  	var connectionString= require( require("path").resolve('./config/connection') ).connectionString || 'mongodb://localhost:27017/test';

    MongoClient.connect( connectionString, function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};