var request = require('request');
var cheerio = require('cheerio');

request('http://www.rbc.ru/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
	var $ = cheerio.load(html);
	$('#js-rateContainer tr').each(function(i, element){
		var cols = $(this).find('td');
		console.log(
			cols.eq(0).text()
			+ " " + cols.eq(1).text()
			+ " " + cols.eq(2).text()
		);
	});
  }
});
