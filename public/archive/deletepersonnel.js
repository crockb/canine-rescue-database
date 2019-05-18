function deletePersonnel(id){
    $.ajax({
        url: '/football/personnel/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};