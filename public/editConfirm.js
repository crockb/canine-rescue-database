function incCapacity() {
	var capacity = document.getElementById("capacity").value;
	capacity++;
	document.getElementById("capacity").value = capacity;
}

function decCapacity() {
	var capacity = document.getElementById("capacity").value;
	if (capacity > 1) {
		capacity--;
	}
	document.getElementById("capacity").value = capacity;
}