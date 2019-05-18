function updateTeam(id){
    $.ajax({
        url: '/football/team/' + id,
        type: 'PUT',
        data: $('#update-team').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};