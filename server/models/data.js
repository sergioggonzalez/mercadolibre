var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(app, mongoose) {

	var dataSchema = new mongoose.Schema({
        query:             { type: String },
        results:          Schema.Types.Mixed,
   	});

	dataSchema.set('redisCache', true);
  dataSchema.set('expires', 30);

	mongoose.model('data', dataSchema);
};
