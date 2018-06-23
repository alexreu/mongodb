var express = require('express');
const bdd = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = "mongodb://localhost:27017/alexandre";

// fonction listing de la bdd
exports.bddList = function (cb){
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        //console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").find({}).toArray(function (err, data) {
            //console.log(data);
            cb(data);
        });
        db.close();
    });
};

// fonction ajout dans la bdd
exports.bddAdd = function(insert, cb){
    bdd.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = db.db("alexandre");
        dbo.collection("personnages").insertOne(insert, function (err, data) {
            var status;
            if(err === 'error'){
                status = "error";
                cb(status)
            }else {
                status = "success";
                cb(status);
            }
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
        dbo.collection("personnages").findOneAndUpdate({_id: ObjectID(user_id)}, {

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
        database.close();
        };
    });
};

// suppression d'un contact en fonction de son id
exports.bddDel = function (del_id, cb) {
    bdd.connect(url, function (err, database) {
        let dbo = database.db("alexandre");
        dbo.collection("personnages").findOneAndDelete({_id: ObjectID(del_id)},
            function (err) {
                var status;
                if (err){
                    status = "success";
                    cb(status)
                }else {
                    status = "error";
                    cb(status);
                }
            });
        database.close();
    });
};

// connexion au back-office
exports.adminConnection = function (username, cb) {
    bdd.connect(url, function (err, database) {
        let dbo = database.db("alexandre");
        //console.log("avant le findOne du login");
        //console.log(username);
        dbo.collection("admin").findOne({username: username},
        function(err, user){
            var status;
            if(err){
                status = "error";
                cb(status)
            }else {
                status = "success";
                cb(user, status);
            }
        });
        database.close();
    })
};