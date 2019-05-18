function deleteposition(id){
    $.ajax({
        url: '/football/position/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};