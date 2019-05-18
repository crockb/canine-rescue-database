function updateSupervisor(id){
    $.ajax({
        url: '/football/supervisor/' + id,
        type: 'PUT',
        data: $('#update-supervisor').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};