function updatePerson(id){
    $.ajax({
        url: '/football/personnel/' + id,
        type: 'PUT',
        data: $('#update-person').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};