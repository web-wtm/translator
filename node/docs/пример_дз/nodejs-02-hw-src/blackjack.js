var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin, // ввод из стандартного потока
	output: process.stdout // вывод в стандартный поток
});
var fs = require('fs');

var handDealer = [];
var handPlayer = [];
var cash = 100;

// логируем результаты
var logfile = process.argv[2];
function log(data) {
	if (logfile != undefined)
		fs.appendFileSync(logfile, data + "\n");
}

// добавляет случайную карту в руку
function dealCard(hand) {
	var cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	hand.push(cardValues[Math.floor(Math.random() * 11)]);
}

// считает сумму очков в руке
function calcSum(hand) {
	var sum = 0;

	// сначала считаем все, кроме тузов
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card != "A") {
			if (card == "J" || card == "Q" || card == "K") 
				sum = sum + 10;
			else
				sum = sum + parseInt(card);
		}
	}

	// туз считается как 1, если текущая сумма больше 10, иначе - как 11
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card == "A") {
			if (sum > 10)
				sum = sum + 1;
			else 
				sum = sum + 11;
		}
	}

	return sum;
}

console.log("Добро пожаловать в казино Титаник!");
console.log("Ваш баланс " + cash + "$");
console.log("Нажмите Enter, чтобы сыграть, или любой символ, чтобы выйти");

function showHands() {
	// показываем состояние игры
	console.log (
		handPlayer.join(" ") + " (" + calcSum(handPlayer) + ") <-> " 
		+ handDealer.join(" ") + " (" + calcSum(handDealer) + ")"
	);	
}

function checkWinner() {
	// показываем карты
	showHands();

	// проверяем результат
	var player = calcSum(handPlayer);
	var dealer = calcSum(handDealer);
	if ((player <= 21) && ((player > dealer) || (dealer > 21))) {
		cash++;
		console.log("Вы выиграли :) Теперь у вас " + cash + "$");		
		log("+");
	} else if (player == dealer) {
		console.log("Ничья! У вас по-прежнему " + cash + "$");
		log("=");
	} else {
		cash--;
		console.log("Вы проиграли :( Теперь у вас " + cash + "$");
		log("-");
	}

	// играем по новой!
	game();
}

function choice() {
	showHands();

	rl.question('Добавить карту? Enter - да, любой символ - нет.', 
		function(answer) {
		if (answer == "") {
			// сдаем карту игроку
			dealCard(handPlayer, true);

			if (calcSum(handPlayer) < 21) {
				// предлагаем взять еще карту
				choice();
			} else {
				// ищем победителя
				checkWinner();
			}
		} else {
			// сдаем карты дилеру
			while (calcSum(handDealer) < 18) {
				dealCard(handDealer);	
			}

			// ищем победителя
			checkWinner();
		}
	});	
}

function game() {
	rl.question('Играем? Enter - да, любой символ - нет.', 
		function(cmd) {
			if (cmd != "")
				process.exit();
			
			// в начале партии сдаем одну карту дилеру, две игроку
			handDealer = [];
			dealCard(handDealer);

			handPlayer = [];
			dealCard(handPlayer);
			dealCard(handPlayer);

			choice();
		});	
};

game();