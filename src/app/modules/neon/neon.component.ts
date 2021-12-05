import { Component, OnInit } from '@angular/core';
import { POSITIONS } from '../const';

@Component({
    selector: POSITIONS.MIDDLE_UPPER,
    templateUrl: './neon.component.html',
    styleUrls: ['./neon.component.scss']
})
export class NeonComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}
