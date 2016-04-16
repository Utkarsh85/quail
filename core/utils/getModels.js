var models= require('require-all')({
  dirname     :  require("path").resolve('./api/models'),
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

module.exports= models;