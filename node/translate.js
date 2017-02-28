var request = require('request');

request.get(
	'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4&lang=en-ru&text=time',
	function(error, response, body) {
		if (error) {
			console.error(error)
		} else {
			console.log(body);
			console.log(response.statusCode);
		}
	}
);