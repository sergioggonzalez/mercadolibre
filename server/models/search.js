exports = module.exports = function(app, mongoose) {

	var searchSchema = new mongoose.Schema({
        query:              { type: String },
        userId:             { type: String }
   	});

	searchSchema.set('redisCache', true)
  searchSchema.set('expires', 30)
	
	mongoose.model('search', searchSchema);
};
