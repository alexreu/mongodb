$(function(){
    // requete ajax pour la récupération des données coté serveur
    var url = "http://localhost:3012/bdd";
    $.ajax({
        url: url,
        success: function (data) {
            //console.log(data);
            data.forEach(function (datas) {
                $('#result').append('<div class="col-md-6 offset-md-3 mt-3"' +
                    ' <input type="hidden" class="id" value="'+ datas._id +'"> <p> Nom : ' + datas.name + " <br>" +
                    " " + ' Genre : ' + datas.genre + '</p></div>');
            });

        }
    });

    // requete pour ajouter un client à la bdd
    $('#add').on('click', function(){
        var url = "http://localhost:3012/bddAdd";
        var name = $("#name").val();
        var gender = $("#gender").val();
        console.log(name);
        console.log(gender);

        if(name && gender !== undefined){
            $.post(url, {
                    name : name,
                    gender: gender
                },
                function(result, status) {
                    if (status === 'success'){
                        console.log("Ajout réussi");
                    }else{
                        console.log('error');
                    }
                }
            )
        }
    });

    // recherche by id
    $('#search').on('click', function(){
        var id;
        var url = "http://localhost:3012/personne/";
        id = $('#id').val();
        console.log(id);
        $.post(url+id,
            {id: id},
            function (result, status) {
                if (status === 'success'){
                    console.log("id trouver");
                    console.log(result._id);
                    $('#name-update').val(result.name);
                    $('#gender-update').val(result.genre);
                    $('#user_id').val(result._id);
                }else {
                    console.log("id non trouver");
                }
            }
        )
    });

    // update des client dans la bdd en fonction de leurs id
    $('#Update').on('click', function () {
        var id;
        var name;
        var gender;
        var url = "http://localhost:3012/bddUpdate";
        name = $("#name-update").val();
        gender = $("#gender-update").val();
        id = $("#user_id").val();
        console.log(name);
        console.log(gender);
        console.log(id);
        $.post(url,
            {name: name,
             gender: gender,
             id: id
            },
            function (result, status) {
                if (status === 'success'){
                    console.log("fichier mis a jour");
                }else {
                    console.log('erreur lors de la mise à jour');
                }
            }
        );
    })
});
