var urlutils = require('url');

// разбиваем URL на части
var params = urlutils.parse(
	'http://user:pass@host.com:8080/p/a/t/h?query=string#hash', true
);
console.dir(params);

// собираем URL с заменой параметров
delete params.host;
params.hostname = "sniffer.org";

delete params.search;
params.query = {key1: 'value1', key2: 'value2'};

console.dir(urlutils.format(params));
