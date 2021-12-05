import { Component, OnInit } from "@angular/core";
import { POSITIONS } from "../const";
import { io } from "socket.io-client";
import { format } from "date-fns";
import { pad } from "../utils";

@Component({
    selector: POSITIONS.TOP_LEFT,
    templateUrl: "./clock.component.html"
})
export class ClockComponent implements OnInit {
    
    socket = io({ path: "/mmsocket" });

    dateStr: string;
    hoursMinutesStr: string;
    seconds: number;

    constructor() { }

    ngOnInit(): void {
        this.socket.emit("_.clock.interval.seconds");

        this.socket.on("clock.interval.seconds", (date: string) => {

            let d = new Date(date);

            this.dateStr = format(d, "EEEE, LLLL dd, yyyy");
            this.hoursMinutesStr = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
            this.seconds = d.getSeconds();
        })
    }

}
