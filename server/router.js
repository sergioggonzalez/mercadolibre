var express         = require("express");
var pjson           = require('./package.json');
var mongoStorage    = require('./controllers/mongoStorage');
var meliData        = require('./controllers/meliData');

/**
 *  Sets up the routes.
 *  @param {object} app - Express app
 */
module.exports.setup = function (app) {

    // API routes
    var api = express.Router();

    api.route('/').get( function(req, res){res.status(200).jsonp("Mercado Libre Exercise "+pjson.version);});

    api.route('/search/')
        .get(mongoStorage.getSearch)
        .post(mongoStorage.newSearch);

    api.route('/data/:query')
        .get(mongoStorage.getStoredMeliData);

    /*api.route('/newdata/:query')
        .get(meliData.getData);*/

    api.route('/:collection')
        .get(mongoStorage.findAllDocuments)
        .post(mongoStorage.addDocument);

    api.route('/:collection/:id')
        .get(mongoStorage.findById)
        .put(mongoStorage.updateDocument)
        .delete(mongoStorage.deleteDocument);

    app.use('/api', api);




};
