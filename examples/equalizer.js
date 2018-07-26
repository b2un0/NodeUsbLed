'use strict';

class Equalizer {

    constructor(board) {
        this.interval = null;
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.tick();

        this.interval = setInterval(this.tick.bind(this), 70);

        console.log(this.constructor.name + ' started');
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        for (let x = 0; x < this.board.sizeX; x++) {
            let height = Math.floor(Math.random() * (this.board.sizeY - 1)) + 1;
            for (let y = 0; y < height; y++) {
                this.screen.set(x, this.board.sizeY - 1 - y, 1);
            }
        }

        this.board.update(this.screen);
    }
}

module.exports = Equalizer;