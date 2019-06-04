function addFavorite(id){
	console.log("Pressed add");
	$.ajax({
		url: '/canine-rescue/favorites/' + id,
		type: 'POST',
		success: function(result) {
			window.location.reload(true);
		}
	});
	console.log("Sent insert");
}