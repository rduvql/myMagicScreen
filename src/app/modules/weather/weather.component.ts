import { Component, OnInit } from "@angular/core";
import { differenceInCalendarDays } from "date-fns";
import { io } from "socket.io-client";
import { POSITIONS } from "../const";

const NB_DAYS_TO_SHOW = 2;

const iconTable = {
    "01d": "wi-day-sunny",
    "02d": "wi-day-cloudy",
    "03d": "wi-cloud",
    "04d": "wi-cloudy",
    "09d": "wi-showers",
    "10d": "wi-day-rain",
    "11d": "wi-thunderstorm",
    "13d": "wi-snow",
    "50d": "wi-fog",

    "01n": "wi-night-clear",
    "02n": "wi-night-cloudy",
    "03n": "wi-cloud",
    "04n": "wi-cloudy",
    "09n": "wi-showers",
    "10n": "wi-night-rain",
    "11n": "wi-thunderstorm",
    "13n": "wi-snow",
    "50n": "wi-fog"
}

@Component({
    selector: POSITIONS.BOTTOM_LEFT,
    templateUrl: "./weather.component.html",
    styleUrls: ["./weather.component.scss", "./weather-icons.css"]
})
export class WeatherComponent implements OnInit {

    socket = io({ path: "/mmsocket" });

    current;
    forecast;

    constructor() { }

    ngOnInit(): void {
        
        this.socket.emit("_.clock.interval.hours");

        this.socket.on("clock.interval.hours", () => {
            this.socket.emit("_.weather.current");
            this.socket.emit("_.weather.forecast");
        });

        this.socket.on("weather.current", (data) => {
            this.current = data;
        });

        this.socket.on("weather.forecast", (data) => {
            let result = [];

            for (let i = 0; i <= NB_DAYS_TO_SHOW; i++) {
                let forecastOfDayI = data.filter(weather => {
                    let isDayI = differenceInCalendarDays(weather.dtMillis, new Date()) === i;
                    let isAfter6AM = new Date(weather.dtMillis).getHours() >= 6;
                    return isDayI && isAfter6AM;
                })
                result.push(forecastOfDayI);
            }

            this.forecast = result;
        })
    }

    getForecastHour(millis: number) {
        return new Date(millis).getHours();
    }

    getWeatherIcon(icon: string) {
        return iconTable[icon];
    }
}
