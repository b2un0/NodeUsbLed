'use strict';

const fetch = require('node-fetch');

class Bitcoin {

    constructor(board) {
        this.interval = null;
        this.price = null;
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.load();

        this.tick();

        setInterval(this.load.bind(this), 2 * 60 * 1000); // load weather every 2 minutes

        this.interval = setInterval(this.tick.bind(this), 1000);

        console.log(this.constructor.name + ' started');
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        let string = this.price ? this.price : '...';

        this.screen.addText(string, 0);

        this.board.update(this.screen);
    }

    async load() {
        let response = await fetch('https://blockchain.info/ticker');
        let body = await response.text();
        let result = JSON.parse(body);

        this.price = String(Math.round(result.USD.last));

        console.log(body);
    }
}

module.exports = Bitcoin;
