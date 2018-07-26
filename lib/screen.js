'use strict';

const font = require('./font.js');

class Screen {

    constructor() {
        this.pixels = new Array(21);

        this.clear();
    }

    clear() {
        for (let i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = 0x00;
        }
    }

    set(x, y, val) {
        //bounds check
        if (!this.boundsValid(x, y)) {
            //fail silently
            return;
        }

        //set bit
        if (val) {
            this.pixels[x] |= 1 << y;
        } else {
            this.pixels[x] &= ~(1 << y);
        }
    }

    get(x, y) {
        //bounds check
        if (!this.boundsValid(x, y)) {
            return false;
        }

        //get bit
        return this.pixels[x] & (1 << y);
    }

    setX(x, val) {
        //bounds check
        if (x < 0 || x > this.pixels.length - 1) {
            //fail silently
            return;
        }

        //set column
        this.pixels[x] = val;
    }

    boundsValid(x, y) {
        if (x < 0 || x > this.pixels.length - 1 || y < 0) {
            return false;
        }
        return true;
    }


    /**
     * add a text to given led array. If align is 0, the text will be centered, 1
     * means aligned left, -1 means aligned right. If the align is more than 1 or
     * less than -1, additional padding will be added to the aligned text
     */
    addText(string, align) {
        //split string
        if (!string.length) {
            return;
        }

        let strAry = string.split('');

        //get offset
        let size = this.getSize(strAry);
        let offset;

        if (align === 0) {
            offset = Math.round((21 - size) / 2);
        } else if (align > 0) {
            offset = align - 1;
        } else if (align < 0) {
            offset = 21 - size + (align + 1);
        }

        //set text
        this.setText(strAry, offset);
    }

    setText(strAry, offset) {
        for (let i = 0; i < strAry.length; i++) {
            //get font bytes
            let c = strAry[i];
            let charBytes = font[c];

            if (charBytes === undefined) {
                continue;
            }

            //set columns
            for (let x = 0; x < charBytes.length; x++) {
                let realX = offset + x;

                this.setX(realX, charBytes[x]);
            }

            offset += charBytes.length + 1;
        }
    }

    getSize(strAry) {
        let size = 0;

        for (let i = 0; i < strAry.length; i++) {
            let c = strAry[i];

            if (font[c] !== undefined) {
                size += font[c].length + 1;
            }
        }

        size = Math.max(0, size - 1);

        return size;
    }
}

module.exports = Screen;