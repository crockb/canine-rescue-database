function deleteFavorite(id){
	console.log("Pressed");
	$.ajax({
		url: '/canine-rescue/favorites/' + id,
		type: 'DELETE',
		success: function(result) {
			window.location.reload(true);
		}
	});
	console.log("Sent");
}