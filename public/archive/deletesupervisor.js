function deletesupervisor(id){
    $.ajax({
        url: '/football/supervisor/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};