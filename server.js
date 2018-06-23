const express = require('express');
const app = express();
const port = 3012;
const bodyParser = require('body-parser');
const crud = require('./crud.js');
const crypto = require('crypto');
const secret = "abcdefg";

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// route pour le front-end
app.get('/', function (req, res) {
    crud.bddList(function (data) {
        res.render('index', {
            contact: data,
            title: "Accueil - Contact"
        })
    })
});

// route pour le back-office
app.get('/admin', function (req, res) {
    crud.bddList(function (data) {
        //console.log(data);
        res.render('admin/index', {
            data: data,
            title: "Back-Office"
        })
    })
});

// route pour l'ajout de contact à la bdd
app.post('/bddAdd', function(req, res){
    var insert;
    var gender;
    var name;
    name = req.body.name;
    gender = req.body.gender;
    insert = {name: name, genre: gender};
    crud.bddAdd(insert, function (status) {
        res.send(status);
    });
});

// route pour la mise a jour des contact en bdd
app.post('/bddUpdate', function(req, res){
    var insert;
    var genre;
    var name;
    var user_id;
    user_id = req.body.id;
    name = req.body.name;
    genre = req.body.gender;
    console.log(name, genre, user_id);
    crud.bddUpdate(user_id, name, genre);

});

// route pour la suppression des contact en bdd
app.post('/bddDel', function (req, res) {
    var del_id = req.body.id;
    console.log(typeof del_id);
    crud.bddDel(del_id, function (status) {
        res.send(status);
    });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    crud.adminConnection(username, function (user, status) {
        var crypted_password = cryptped(password);
        console.log(user);
        console.log(user.username === username);
        console.log(user.password === crypted_password);
        if(user.username === username && user.password === crypted_password){
            var success = "success";
            res.send(success);
        }else{
            var error = "error";
            res.send(error);
        }
    });
});
// fonction qui crypte le mot de passe en sha256
function cryptped(password){
    const hash = crypto.createHmac("sha256", secret)
        .update(password)
        .digest("hex");
    //console.log(hash);
    return hash;
}
// port d'écoute du server
app.listen(port, function () {
    console.log('Server ON / port: ' + port);
});
