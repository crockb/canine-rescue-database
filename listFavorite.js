function addFavorite(id){
	var payload = {};
	$.ajax({
		url: '/canine-rescue/favorite/' + id,
		type: 'POST',
		data: payload, success: function(result) {
			window.location.reload();
		}
	});

}

function removeFavorite(id){
	var payload = {};
	$.ajax({
		url: '/canine-rescue/favorite/' + id,
		type: 'DELETE',
		data: payload, success: function(result) {
			window.location.reload();
		}
	});

}