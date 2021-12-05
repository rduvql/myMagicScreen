// @ts-check

const { MMModule } = require("../utils.node");

module.exports = MMModule({

    name: "clock",

    onSocket: {
        /**
         * @param {number} seconds 
         */
        "_.clock.interval.seconds": (client, seconds = 1) => {

            let interval = setInterval(() => {
                let d = new Date();
                client.emit(seconds === 1 ? `clock.interval.seconds` : `clock.interval.seconds.${seconds}`, d);

            }, seconds * 1000);

            client.emit(seconds === 1 ? `clock.interval.seconds` : `clock.interval.seconds.${seconds}`, new Date());

            client.on("disconnect", () => {
                clearInterval(interval);
            });
        },

        /**
         * @param {number} minutes 
         */
        "_.clock.interval.minutes": (client, minutes = 1) => {

            let interval = setInterval(() => {
                let d = new Date();
                client.emit(minutes === 1 ? `clock.interval.minutes` : `clock.interval.minutes.${minutes}`, d);

            }, minutes * 1000 * 60);

            client.emit(minutes === 1 ? `clock.interval.minutes` : `clock.interval.minutes.${minutes}`, new Date());

            client.on("disconnect", () => {
                clearInterval(interval);
            });
        },

        /**
         * @param {number} hours 
         */
        "_.clock.interval.hours": (client, hours = 1) => {

            let interval = setInterval(() => {
                let d = new Date();
                client.emit(hours === 1 ? "clock.interval.hours" : `clock.interval.hours.${hours}`, d);

            }, hours * 1000 * 60 * 60);

            client.emit(hours === 1 ? "clock.interval.hours" : `clock.interval.hours.${hours}`, new Date());

            client.on("disconnect", () => {
                clearInterval(interval);
            });
        }
    }
})
