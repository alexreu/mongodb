const express = require('express');
const app = express();
let port = 3012;
let bdd = require('mongodb').MongoClient;
let assert = require('assert');
let url = "mongodb://localhost:27017/alexandre";

app.use(express.static('static'));

app.get('/test', function(req, res){
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").find({}).toArray(function (err, data) {
            console.log(data);
            console.log(data[0].name);
            res.send(data);
        });
        db.close();
    });
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, function () {
    console.log('Server ON / port: ' + port);
})