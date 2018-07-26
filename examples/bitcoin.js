'use strict';

const request = require('request');

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

    load() {
        let url = 'https://blockchain.info/ticker';
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let result = JSON.parse(body);
                if (result.USD) {
                    this.price = String(Math.round(result.USD.last));
                } else {
                    console.error(result);
                }
            }
        }.bind(this));
    }
}

module.exports = Bitcoin;