var text = require('../text.js');
var sprintf = require('sprintf-js').sprintf;

//vars
var screen = require('../screen.js');
var interval;
var showColon;

//tick
function tick() {
	screen.clear();
	var colon = showColon ? ':' : ' ';
	var time = new Date();
	var timeStr = sprintf('%02d%s%02d', time.getHours(), colon, time.getMinutes());
	text.addText(screen, timeStr, 0);
	board.update(screen);
	showColon = !showColon;
}

//start
function start() {
	showColon = true;
	tick();
	interval = setInterval(tick, 1000);
}
exports.start = start;

//stop
function stop() {
	clearInterval(interval);
}
exports.stop = stop;

//set board
function setBoard(_board) {
	board = _board;
	screen.init(board.sizeX, board.sizeY);
}
exports.setBoard = setBoard;