'use strict';

class HelloWorld {

    constructor(board) {
        this.showColon = true;
        this.interval = null;
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.tick();

        console.log(this.constructor.name + ' started');


        this.interval = setInterval(this.tick.bind(this), 750);
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        this.screen.addText(this.showColon ? 'Hello' : 'World', 0);

        this.board.update(this.screen);

        this.showColon = !this.showColon;
    }
}

module.exports = HelloWorld;