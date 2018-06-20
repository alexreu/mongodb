const express = require('express');
const app = express();
const port = 3012;
const bodyParser = require('body-parser');
var crud = require('./crud.js');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

// route pour acceder à la bdd et récupérer les données
app.get('/bdd', function(req, res){
    crud.bddList(function (data) {
        res.send(data);
    });

});

app.post('/bddAdd', function(req, res){
    var insert;
    var gender;
    var name;
    name = req.body.name;
    gender = req.body.gender;
    insert = {name: name, genre: gender};
    crud.bddAdd(insert);
});

app.post('/personne/:id', function(req, res){
    var id= 0;
    var id_param = req.params.id;
    id = id_param - 1;
    crud.bddSearch(function (data) {
        res.send(data[id]);
    })
});

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

// renvoie la page html
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, function () {
    console.log('Server ON / port: ' + port);
});
