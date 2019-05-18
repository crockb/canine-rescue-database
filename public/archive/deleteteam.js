function deleteTeam(id){
    $.ajax({
        url: '/football/team/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};