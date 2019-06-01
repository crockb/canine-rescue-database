function incCapacity() {
	var capacity = document.getElementById("capacity").innerHTML;
	capacity++;
	document.getElementById("capacity").innerHTML = capacity;
}

function decCapacity() {
	var capacity = document.getElementById("capacity").innerHTML;
	if (capacity > 1) {
		capacity--;
	}
	document.getElementById("capacity").innerHTML = capacity;
}

// Update the database
function updateConfirm1(id) {
	var payload = {};

	// Format date and time for pick up
	var pickUpDate = document.getElementById("dateConfirm").value;
	var pickUpTime = document.getElementById("timeConfirm").value;
	payload.date_time = pickUpDate + ' ' + pickUpTime;

	// Add capacity to payload
	payload.capacity = document.getElementById("capacity").textContent;

	// Get today's date and format it
	var today = new Date();
	dd = String(today.getDate()).padStart(2, '0');
	mm = String(today.getMonth() + 1).padStart(2, '0');
	yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	payload.acceptance_date = today;

	payload.status = "ACCEPTED";

	// AJAX Request
	$.ajax({
		url: '/canine-rescue/confirm/' + id,
		type: 'PUT',
		data: payload, success: function(result) {
			window.location.reload();
		}
	});
}

// Update the database
function updateConfirm2(id) {
	var payload = {};

	// Format date and time for pick up
	var pickUpDate = document.getElementById("dateConfirm").value;
	var pickUpTime = document.getElementById("timeConfirm").value;
	payload.date_time = pickUpDate + ' ' + pickUpTime;

	// Add capacity to payload
	payload.capacity = document.getElementById("capacity").textContent;
	payload.status = "REJECTED";
	payload.acceptance_date = null;

	// AJAX Request
	$.ajax({
		url: '/canine-rescue/confirm/' + id,
		type: 'PUT',
		data: payload, success: function(result) {
			window.location.reload();
		}
	});
}