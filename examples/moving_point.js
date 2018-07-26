'use strict';

class MovingPoint {

    constructor(board) {
        this.interval = null;
        this.x = 0;
        this.y = 0;
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.tick();

        this.interval = setInterval(this.tick.bind(this), 10);

        console.log(this.constructor.name + ' started');
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        if (this.y === 0) {
            if (this.x === this.board.sizeX - 1) {
                this.y++;
            } else {
                this.x++;
            }
        } else if (this.x === 0) {
            this.y--;
        } else if (this.x === this.board.sizeX - 1) {
            if (this.y === this.board.sizeY - 1) {
                this.x--;
            } else {
                this.y++;
            }
        } else if (this.y === this.board.sizeY - 1) {
            this.x--;
        }

        this.screen.set(this.x, this.y, 1);

        this.board.update(this.screen);
    }
}

module.exports = MovingPoint;