const express = require('express');
const app = express();
const port = 3012;
const bdd = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017/alexandre";
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/bddAdd', function(req, res){
    var insert;
    var gender;
    var name;
    name = req.body.name;
    gender = req.body.gender;
    insert = {name: name, genre: gender};
    console.log(name);
    console.log(gender);
    console.log(insert);
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").insertOne(insert, function (err, res) {
            if(err) throw err;
            console.log("ajout du client effectuer");
        });
        db.close();
    });
});

app.post('/personne/:id', function(req, res){
    var id= 0;
    var id_param = req.params.id;
    id = id_param - 1;
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").find({}).toArray(function (err, data) {
            console.log(data);
            res.send(data[id]);
        });
        db.close();
    });
});

app.post('/bddUpdate', function(req, res){
    var insert;
    var gender;
    var name;
    name = req.body.name;
    gender = req.body.gender;
    insert = {name: name, genre: gender};
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = database.db("alexandre");
        dbo.collection("personnages").updateOne(insert, function (err, res) {
            if(err) throw err;
            console.log("ajout du client effectuer");
        });
        database.close();
    });
});

// renvoie la page html
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, function () {
    console.log('Server ON / port: ' + port);
});


/* TODO : callback a completer et à tester */
function test (cb){
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").find({}).toArray(function (err, data) {
            console.log(data);
            cb(data);
        });
        db.close();
    });
}

test(function () {
    console.log(data);
});