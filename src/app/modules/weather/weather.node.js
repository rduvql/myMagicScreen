// @ts-check

const process = require("process");

let weather = {
    api_key: process.env["OWM_API_KEY"] || "",
    city: "rennes",
    country_code: "fr",
    metric: "metric"
}

const axios = require("axios").default;

const { MMModule } = require("../utils.node");

const API_URL_CURRENT = "http://api.openweathermap.org/data/2.5/weather"; // ?q=rennes,fr&appid=OWM_API_KEY"
const API_URL_FORECAST = "http://api.openweathermap.org/data/2.5/forecast"; // ?q=rennes,fr&appid=OWM_API_KEY"

const API_KEY = weather.api_key;
const CITY = weather.city
const METRIC = weather.metric
const COUNTRY_CODE = weather.country_code

module.exports = MMModule({

    name: "weather",

    onSocket: {

        "_.weather.current": (client, data) => {
            getWeather(API_URL_CURRENT).then(result => {
                let current = currentWeatherMapping(result.data);
                client.emit("weather.current", current);
                // logger.info(result.data);
            })
        },
        "_.weather.forecast": (client, data) => {
            getWeather(API_URL_FORECAST).then(result => {
                let forecast = forecastWeatherMapping(result.data);
                client.emit("weather.forecast", forecast)
                // logger.info(result.data, "weather.getData.forecast")
            })
        }
    }
});

/**
 * @returns {Promise<any>}
 */
function getWeather(url) {
    const queryObj = {
        appid: API_KEY,
        units: METRIC,
        q: `${CITY},${COUNTRY_CODE}`
    };

    return axios.get(url, {
        params: queryObj,
        responseType: "json"

    }).catch(e => {
        // logger.error(e.message ? e.message : e)
        console.log(e)
    })
}

function currentWeatherMapping(raw) {
    return {
        weather: raw.weather[0].main,
        description: raw.weather[0].description,
        icon: raw.weather[0].icon,
        dtMillis: raw.dt * 1000,
        temp: parseInt(raw.main.temp.toFixed(0)),
        humidity: raw.main.humidity
    }
}

function forecastWeatherMapping(raw) {
    return raw.list.map((item) => {
        return {
            weather: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            dtMillis: item.dt * 1000,
            temp: parseInt(item.main.temp.toFixed(0)),
            humidity: item.main.humidity
        };
    });
}
