const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;

/*const urldb = 'mongodb+srv://admin:1234@cluster0-ysx0w.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(urldb)
    .then(db => console.log('DataBases connected.'))
    .catch(err => console.error(err));


module.exports = mongoose*/


const dbConnectionUrl = "mongodb+srv://admin:1234@cluster0-ysx0w.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};