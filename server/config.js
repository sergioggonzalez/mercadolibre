/* global exports*/
/*
 * server configs
 */
var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if (DOCKER_DB) {
    MONGO_DB = DOCKER_DB.replace('tcp', 'mongodb') + '/meli';
} else {

    MONGO_DB = "mongodb://localhost/meli";
}

exports.conf = {
    server: "localhost",
    port: "3000",
    mongodb: MONGO_DB
};
