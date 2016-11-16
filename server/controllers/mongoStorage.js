var express             = require("express"),
    app                 = express();
var meliData            = require('./meliData');
var mongoose            = require('mongoose');
var mongooseRedisCache  = require("mongoose-redis-cache");

var config          = require('../config').conf;



// Import Models
var modelsSearch                 = require('../models/search')(app, mongoose),
    modelsData                 = require('../models/data')(app, mongoose);


// Connection to DB
mongoose.connect(config.mongodb, function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

mongooseRedisCache(mongoose);

function setModel(req){
    return mongoose.model(req.params.collection);
}


//GET - Return all documents in the DB
exports.getSearch = function(req, res) {
    var Document = mongoose.model('search');
    var queryStrig = require('url').parse(req.url,true).query;

    var query = Document.find({})
    if(queryStrig.userId){
      query.where("userId", queryStrig.userId)
    }
    query.lean()
    query.exec(function(err, result){
      if(err) res.send(500, err.message);
      console.log(new Date());
      console.log('GET /search');
      res.status(200).jsonp(result);
    });

};

//POST - Insert a new Document in the DB
exports.newSearch = function(req, res) {
  var Document = mongoose.model('search');
  console.log(new Date());
  console.log('POST');
	document = new Document(req.body);
	console.log(document);
    document.save(function(err, document) {
		if(err) return res.status(500).send(err.message);
    meliData.getData(req.body.query);
    res.status(200).jsonp(document);
	});
};

exports.storeMeliData = function(data) {
    var Document = mongoose.model('data');
    document = new Document(data);
    document.save(function(err, document) {
        if(err) console.log(err);
        return document;
    });
};

//GET - Stored meliData
exports.getStoredMeliData = function(req, res) {
    var Document = mongoose.model('data');
    var query = Document.findOne({})
    query.where("query", req.params.query)

    query.lean()
    query.exec(function(err, result){

    if(err) res.send(500, err.message);

    if(result != null){
      console.log(new Date());
      console.log('GET Stored Data');
      res.status(200).jsonp(result);
    }else{
      console.log(new Date());
      console.log('GET New Data from API');
      var newData = meliData.getData(req.params.query);
      res.status(200).jsonp(newData);
    }


    });

};

//*************** FUNCIONES GENERICAS *******************//
//GET - Return all documents in the DB
exports.findAllDocuments = function(req, res) {
    var Document = setModel(req);
    var query = {};
    var queryStrig = require('url').parse(req.url,true).query;

    if(queryStrig.userId){
       query = {'userId': queryStrig.userId}
    }

    Document.find(query,null, {sort: {fechaDesde: -1}},function(err, documents) {
    if(err) res.send(500, err.message);
    console.log(new Date());
    console.log('GET /' + req.params.collection);
		res.status(200).jsonp(documents);
	});
};



//GET - Return a document with specified ID
exports.findById = function(req, res) {
    var Document = setModel(req);
    Document.findById(req.params.id, function(err, document) {
    if(err) return res.status(500).send(err.message);
    console.log(new Date());
    console.log('GET /' + req.params.collection +'/' + req.params.id);
	  res.status(200).jsonp(document);

	});
};



//POST - Insert a new Document in the DB
exports.addDocument = function(req, res) {
    var Document = setModel(req);
    console.log(new Date());
    console.log('POST');
	document = new Document(req.body);
	console.log(document);
    document.save(function(err, document) {
		if(err) return res.status(500).send(err.message);
    res.status(200).jsonp(document);
	});
};

//PUT - Update a register already exists
exports.updateDocument = function(req, res) {

    var Document = setModel(req);
    Document.findById(req.params.id, function(err, document) {
        var keepThis = ['_id', '__v', 'id'];
        var newDoc = req.body;
        for ( var key in newDoc) {
            keepThis.push( key );
        }
        for (var field in Document.schema.paths) {
            if(field.indexOf('_') === 0 ) {
                continue;
            }
            if(keepThis.indexOf( field ) !== -1) {
                document[field] = newDoc[field];
                continue;
            }
            document[field]=undefined;
        }
        document.save(function(err, document) {
        if(err) return res.status(500).send(err.message);
            console.log(new Date());
            console.log('PUT');
            console.log(document);
            res.status(200).jsonp(document);
         });

    });
};

//DELETE - Delete a document with specified ID
exports.deleteDocument = function(req, res) {
    console.log(new Date());
    console.log('DELETE /' + req.params.collection +'/' + req.params.id);
    var Document = setModel(req);
    Document.findById(req.params.id, function(err, document) {
        document.remove(function(err) {
			if(err) return res.send(500, err.message);
            res.status(200).jsonp(document);
		});
	});
};
