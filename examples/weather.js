'use strict';

const request = require('request');

class Weather {

    constructor(board) {
        this.temp = null;
        this.unit = 'c'; // f: Fahrenheit, c: Celsius
        this.woeid = 12596838; // Berlin, Germany. Lookup: http://woeid.rosselliot.co.nz/
        this.board = board;
        this.screen = board.getScreen();
    }

    start() {
        this.load();

        this.tick();

        setInterval(this.load.bind(this), 5 * 60 * 1000); // load weather every 5 minutes

        console.log(this.constructor.name + ' started');

        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    stop() {
        clearInterval(this.interval);

        console.log(this.constructor.name + ' stopped');
    }

    tick() {
        this.screen.clear();

        let string = this.temp ? this.temp + '°' : '...';

        this.screen.addText(string, 0);

        this.board.update(this.screen);
    }

    load() {
        let locationQuery = encodeURIComponent('select * from weather.forecast where woeid = ' + this.woeid + ' and u = "' + this.unit + '"');
        let url = "https://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json";

        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let result = JSON.parse(body);
                if (result.query.count === 1) {
                    this.temp = result.query.results.channel.item.condition.temp;
                    // console.log(result.query.results.channel.item.title + ': ' + this.temp + this.unit);
                } else {
                    console.error(result.query);
                }
            }
        }.bind(this));
    }
}

module.exports = Weather;