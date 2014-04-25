//init board
var board = require('./board.js');
board.connect();

//plugins
var pluginNames = [
	'equalizer',
	'moving_point',
	'clock',
];

//init plugins
var plugins = [];
for(var i = 0; i < pluginNames.length; i++) {
	var plugin = require('./plugins/' + pluginNames[i] + '.js');
	plugin.setBoard(board);
	plugins.push(plugin);
}

//rotate
var lastPlugin = null;
var i = 0;
function rotate() {
	if(lastPlugin) {
		lastPlugin.stop();
	}
	lastPlugin = plugins[i];
	lastPlugin.start();
	
	if(++i > plugins.length - 1) {
		i = 0;
	}
}

//loop
rotate();
setInterval(function() {
	rotate();
}, 5000);