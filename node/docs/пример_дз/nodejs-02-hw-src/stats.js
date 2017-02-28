var fs = require('fs');
var logfile = process.argv[2];

fs.readFile(logfile, function(err, data) {
	if (err) {
		console.error('Ошибка при чтении файла: ' + err);
		console.dir(err);
		process.exit(1);
	}

	data = data.toString().split("\n");
	if (data.length == 0) {
		console.log("Нечего анализировать!");
		process.exit(1);	
	}

	// удаляем последнюю пустую строчку
	data.pop()

	var wins = 0;
	var loses = 0;
	var draws = 0;

	var games = data;

	for (var i=0; i<data.length; i++) {
		if (data[i] == "+") {
			wins++;
		} else if (data[i] == "-") {
			loses++;
		} else {
			draws++;
		}
	}

	console.log("Всего сыграно игр: " + games.length);
	console.log("Побед: " + wins + ", ничьих: " + draws + ", поражений:" + loses);
	console.log("Процент выигрышей (без учета ничьих): " + (wins*100/loses).toFixed(2) + "%");
});