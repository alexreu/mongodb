let url = "http://localhost:3012/bdd";
$.ajax({
    url: url,
    success: function (data) {
        console.log(data);
        $('#data').append(data[0].name + "  " + data[0].genre);
    }
});