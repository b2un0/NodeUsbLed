'use strict';

class Clock {

    constructor(board) {
        this.showColon = true;
        this.interval = null;
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.tick();

        this.interval = setInterval(this.tick.bind(this), 1000);

        console.log(this.constructor.name + ' started');
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        let colon = this.showColon ? ':' : ' ';
        let time = new Date();
        let timeStr = ('0' + time.getHours()).slice(-2) + colon + ('0' + time.getMinutes()).slice(-2);

        this.screen.addText(timeStr, 0);

        this.board.update(this.screen);

        this.showColon = !this.showColon;
    }
}

module.exports = Clock;