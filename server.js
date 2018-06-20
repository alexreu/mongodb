const express = require('express');
const app = express();
const port = 3012;
const bdd = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017/alexandre";

app.use(express.static('static'));

// route pour acceder à la bdd et récupérer les données
app.get('/bdd', function(req, res){

    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").find({}).toArray(function (err, data) {
            console.log(data);
            res.send(data);
        });
        db.close();
    });

});

// renvoie la page html
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, function () {
    console.log('Server ON / port: ' + port);
});