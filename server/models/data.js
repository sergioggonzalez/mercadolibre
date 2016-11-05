var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(app, mongoose) {

	var dataSchema = new mongoose.Schema({
        query:             { type: String },
        results:          Schema.Types.Mixed,
   	});

	mongoose.model('data', dataSchema);
};
