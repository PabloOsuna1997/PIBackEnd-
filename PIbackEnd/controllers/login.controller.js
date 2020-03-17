const db = require("../bd/conectionBD");
const dbName = "server";
const collectionName = "rol";

const login = {};

login.get = async (req, res) => {

    db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
        // get all items
        dbCollection.find().toArray(function(err, result) {
            if (err) throw err;
              console.log(result);
              res.send(result);
        });
        
    }, function(err) { // failureCallback
        throw (err);
    });
}

module.exports = login;
