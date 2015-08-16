var getGeoLocation = function(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt) {

	var locationInfo = function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitude;

		displayLat.innerHTML = latitude;
		hiddenLat.value = latitude;
		displayLong.innerHTML = longitude;
		hiddenLong.value = longitude;
		displayAlt.innerHTML = altitude;
		hiddenAlt.value = altitude;

	};

	var locationInfoError = function(error) {
		var errorMessage = ['',
		'Permission denied',
		'Position unavailable',
		'timeout'];

		console.log('error receiving location info: ' + errorMessage[error.code]);
		displayLat.innerHTML = 'error receiving location info.';
		displayLong.innerHTML = 'error receiving location info.';
		displayAlt.innerHTML = 'error receiving location info.';
	};

	displayLat.innerHTML = 'loading...';
	displayLong.innerHTML = 'loading...';
	displayAlt.innerHTML = 'loading...';
	navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
};

var storeData = function(jsonData, locStorage) {
	localStorage.setItem(locStorage, JSON.stringify(jsonData));
};

var getCurrentDate = function(date) {
	var today = new Date();
	date.value = [(today.getMonth() + 1), today.getDate(), today.getFullYear()].join('/');
}

var formatData = function(data) {
	var jsonData = {};
	data.forEach(function(element) {
		jsonData[element.name] = element.value;
	});
	return jsonData;
};
			
var initiateSuccessFunc = function(spanElement, dateElement) {
	
	var successFunc = function(message) {
		getCurrentDate(dateElement);
		$('.reset').val('');
		$('.resetHTML').html('');
		spanElement.innerHTML = message;
		setTimeout(function() {spanElement.innerHTML = ''}, 3000);
	};

	return successFunc;
};

var initiateErrorFunc = function(jsonData, spanElement, dateElement) {

	var errorFunc = function(error) {
		getCurrentDate(dateElement);
		$('.reset').val('');
		$('.resetHTML').html('');
		spanElement.innerHTML = 'You appear offline. <br> Your work order has been saved locally. <br> Submission of work order will take place as soon as you come back online.';
		setTimeout(function() {spanElement.innerHTML = ''}, 5000);
		var uniqueFormIdentity = jsonData.firstName + jsonData.lastName + jsonData.Description;
		storeData(jsonData, uniqueFormIdentity);
		sendCachedData(uniqueFormIdentity, spanElement, dateElement);
	};

	return errorFunc;
};

var ajaxCall = function(jsonData, spanElement, dateElement) {
	var options = {
		url :'/ajaxcall',
		type: 'POST',
		success: initiateSuccessFunc(spanElement, dateElement),
		error: initiateErrorFunc(jsonData, spanElement, dateElement),
		data: jsonData
	}
	$.ajax(options);
};

var callSendCache = function(locStorage, spanElement, dateElement) {
	sendCachedData(locStorage, spanElement, dateElement);
};

var sendCachedData = function(locStorage, spanElement, dateElement) {
	console.log('attempting to send cached data');
	var options = {
		url: '/ajaxCall',
		type: 'POST',
		success: console.log('cached data sent to server!'), 
		error: function() {setTimeout(callSendCache(locStorage, spanElement, dateElement), 5000)},
		data: JSON.parse(localStorage[locStorage])
	}
	$.ajax(options);
};