$(function(){
    // requete pour ajouter un contact à la bdd
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

    // update des contacts dans la bdd en fonction de leurs id
    $('#update').on('click', function () {
        var id;
        var name;
        var gender;
        var url = "http://localhost:3012/bddUpdate";
        name = $("#name-update").val();
        gender = $("#gender-update").val();
        id = $("#user_id").val();
        console.log(id);
        console.log(name);
        console.log(gender);
        if(name && gender && id !== undefined){
            $.post(url,
                {name: name,
                    gender: gender,
                    id: id
                },
                function (result, status) {
                    if (status === 'success'){
                        console.log("fichier mis a jour");
                        location.reload(true);
                    }else {
                        console.log('erreur lors de la mise à jour');
                    }
                }
            );
        }
    });
    // permet de recuperer les data dans le bouton et de les afficher dans le formulaire
    $("#editModal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        console.log(button);
        var name = button.data('name');
        console.log(name);
        var gender = button.data('gender');
        console.log(gender);
        var user_id = button.data('id');
        console.log(user_id);

        var modal = $(this);
        modal.find('#name-update').val(name);
        modal.find('#gender-update').val(gender);
        modal.find('#user_id').val(user_id);
    });
    // requete pour la suppression d'un contact dans la bdd en fonction de son id
    $(".del").on('click', function () {
        var id = $(this).data(id);
        console.log(typeof id);
        console.log(id);
        var url = "http://localhost:3012/bddDel";
        $.post(url, {
            id: id.id,
        },
            function (result, status) {
                if (status === 'success'){
                    console.log("client supprimer");
                    location.reload(true);
                }else {
                    console.log('erreur lors de la suppression');
                }
            }
        )
    });

    // requete pour la connexion au back-office
    $('#connection').on('click', function (e) {
        //event.preventDefault();
        var username = $('#username').val();
        var passsword = $('#password').val();
        var url = "http://localhost:3012/login";
        console.log(username);
        console.log(passsword);
        if (username && passsword !== undefined){
            $.post(url, {
                username: username,
                password: passsword
            },
                function (result, status) {
                    //console.log(status);
                    console.log(result);
                    if (result === "error") {
                        //console.log('success');

                        $('#result').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            '<p class="m-0">Mot de passe / Nom d\'utilisateur invalide</p>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>')
                    }else if (result === "success") {
                        window.location = "http://localhost:3012/admin"
                    }
                }
            )
        }
    })
});
