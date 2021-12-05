import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Systeminformation } from 'systeminformation';
import { POSITIONS } from '../const';

@Component({
    selector: POSITIONS.BOTTOM_RIGHT,
    templateUrl: './system-info.component.html',
    styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {

    socket = io({ path: "/mmsocket" });

    fsSizes: Systeminformation.FsSizeData[] = [];

    constructor() { }

    ngOnInit(): void {

        this.socket.emit("_.clock.interval.hours");
        this.socket.on("clock.interval.hours", (data) => {
            this.socket.emit("_.info.fssize");
        })

        this.socket.on("info.fssize", (data: Systeminformation.FsSizeData[]) => {
            this.fsSizes = data;
        })
    }
}
