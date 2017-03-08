var request = require('request'),
	express = require('express'), 
	urlutils = require('url'),
	bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extend : true}));
app.use(bodyParser.json());

var templating = require('consolidate'); // handlbars
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('translator', {
		title : 'Заполните форму'
	});
});

app.post('/', function (req, res) {
	if (!req.body.text || req.body.text == "") {
		res.render('translator', {
			title: 'Введите слово для перевода!'
		});
	} else {
		var url = urlutils.format({
			protocol: 'https',
			hostname: 'translate.yandex.net',
			pathname: 'api/v1.5/tr.json/translate',
			query: {
				key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
				lang: req.body.lang,
				text: req.body.text
			}
		});

		request.get({url: url, json: true},
			function (error, response, json) {
				var data = {};

				if (error || json.code != 200) {
					data = {
						title: "Ошибка при вводе слова " + req.body.text,
						error: json.message
					}
				} else {
					data = {
						title: 'Перевод слова ' + req.body.text + " : " + json.text
					}
				}

				res.render('translator', data);
			}
		)
	}
});
app.listen(3000);