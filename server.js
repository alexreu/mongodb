const express = require('express');
const app = express();
let port = 3012;
let bdd = require('mongodb').MongoClient;
let assert = require('assert');
let url = "mongodb://localhost:27017/alexandre";

bdd.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connexion BDD Ok");
    let dbo = db.db("alexandre");
    dbo.collection("personnages").find({}).toArray(function (err, result) {
        console.log(result);
    });
    db.close();
});

app.get('/', function (req, res) {
    res.send('Hello World')
});


app.listen(port, function () {
    console.log('Server ON / port: ' + port);
})