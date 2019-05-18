function updateposition(id){
    $.ajax({
        url: '/football/position/' + id,
        type: 'PUT',
        data: $('#update-position').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};