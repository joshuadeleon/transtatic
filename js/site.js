
//	Gets a random number between the min and max given
//	min: (integer) An integer which is the lower bound for the random number
//	max: (integer) An integer which is the upper bound for the randon number
//	Returns: (integer) A random number between the given min and max.
function GetRandomIntBetween(min, max) {
	var minValue = Math.min(min, max);
	var maxValue = Math.max(min, max);

	return Math.floor((Math.random() * (maxValue - minValue + 1)) + minValue);
}


//	Hides any element given as a paramenter
function HideElements() {
	for (var i = 0; i < arguments.length; ++i) {
		$(arguments[i]).hide();
	}
}

//	Reads a JSON file. 
function readJSONFile(file) {
	var jsonFile = new XMLHttpRequest();
	//jsonFile.responseType = "json";
	jsonFile.open("GET", file, true);
	jsonFile.onreadystatechange = function () {
		if (jsonFile.readyState === XMLHttpRequest.DONE && (jsonFile.status === 200 || jsonFile.status === 0)) {
			//	TODO: handle any errors
			return JSON.parse(jsonFile.responseText);
		}
	}
	jsonFile.send(null);
}