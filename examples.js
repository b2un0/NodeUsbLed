'use strict';

const fs = require('fs');

const dcled = require('./dcled.js');

let examples = [];
let lastExample = 0;
let currentExample = 0;

let board = new dcled();

board.connect();

fs.readdirSync('./examples/').forEach(function (file) {
    let example = require('./examples/' + file);

    let instance = new example(board);

    examples.push(instance);
});

function rotate() {
    if (lastExample) {
        lastExample.stop();
    }

    lastExample = examples[currentExample];
    lastExample.start();

    if (++currentExample > examples.length - 1) {
        currentExample = 0;
    }
}

// first start
rotate();

// loop
setInterval(rotate, 5000);