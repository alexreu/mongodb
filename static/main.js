// requete ajax pour la récupération des données coté serveur
const url = "http://localhost:3012/bdd";
$.ajax({
    url: url,
    success: function (data) {
        console.log(data);
        $('#result').append('<div class="col-md-4 offset-md-4 mt-3" <p> Nom : ' + data[0].name + "  " + ' Genre : ' + data[0].genre + '</p></div>');
    }
});