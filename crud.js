var express = require('express');
const bdd = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017/alexandre";

// fonction listing de la bdd
exports.bddList = function (cb){
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
};

// fonction ajout dans la bdd
exports.bddAdd = function(insert){
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
};

// fonction de recherche dans la bdd avec un id
exports.bddSearch = function (cb) {
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
};

// mise a jour des clients dans la bdd
exports.bddUpdate = function (user_id, name, genre) {
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = database.db("alexandre");
        console.log("avant de set les données");
        dbo.collection("personnages").findOneAndUpdate({_id: user_id}, {

            $set: {
                name: name,
                genre: genre
            }
        }), function (err) {
            if (err){
                console.log("erreur de MAJ");
            }else {
                console.log("ajout réussi");
            }

        };
    });
};