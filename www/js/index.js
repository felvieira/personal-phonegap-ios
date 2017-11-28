var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		document.addEventListener('deviceready', function () {
			// Enable to debug issues.
			// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

			var notificationOpenedCallback = function (jsonData) {
				console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
			};

			window.plugins.OneSignal
				.startInit("afa3973a-4326-47e0-a79f-b76ff7f9d96a")
				.handleNotificationOpened(notificationOpenedCallback)
				.endInit();

			window.plugins.OneSignal.getIds(function (ids) {
				console.log('getIds: ' + JSON.stringify(ids));
				console.log("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
				// alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);

				document.getElementById("OneSignalUserID").innerHTML = ids.userId;
				document.getElementById("OneSignalPushToken").innerHTML = ids.pushToken;
			});

			// Call syncHashedEmail anywhere in your app if you have the user's email.
			// This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
			// window.plugins.OneSignal.syncHashedEmail(userEmail);
		}, false);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function () {
		this.receivedEvent('deviceready');

		document.getElementById("abrirApp")
			.addEventListener("click", abrirApp, false);

		document.getElementById("abrirApp")
			.addEventListener("touchstart", abrirApp, false);

		document.addEventListener("backbutton", onBackKeyDown, false);

		function onBackKeyDown(e) {
			e.preventDefault();
		}

	},

	// Update DOM on a Received Event
	receivedEvent: function (id) {
		console.log('Received Event: ' + id);
	},
};

function getAjax(url, success) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('GET', url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
	return xhr;
}

function postAjax(url, success) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('POST', url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
	return xhr;
}

function onError(error) {
	alert("code: " + error.code +
		"message:" + error.message);
}

function abrirApp() {
	// alert('CLICOU!')
	document.getElementById("loader-pre-container").classList.add("hide-loader");
	var pushID = document.getElementById("OneSignalUserID").textContent;
	var pushToken = document.getElementById("OneSignalPushToken").textContent;
	var urlRedirect = 'http://app.meupersonalvirtual.com.br/?';
	var urlRedirectFinal = urlRedirect + "&appUserId=" + pushID + "&appPushToken=" + pushToken;
	// alert(`PushID = ${pushID} , PushToken = ${pushToken} , ${urlRedirectFinal}`);
	window.open(urlRedirectFinal, "_self", 'location=no,toolbar=no,hardwareback=no');
}

app.initialize();