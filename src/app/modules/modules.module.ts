import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
import { WeatherComponent } from './weather/weather.component';
import { NeonComponent } from './neon/neon.component';
import { SystemInfoComponent } from './system-info/system-info.component';

const COMPONENT_MODULES = [
    ClockComponent, 
    WeatherComponent, 
    SystemInfoComponent,
    NeonComponent
]

@NgModule({
    declarations: COMPONENT_MODULES,
    imports: [
        CommonModule
    ],
    exports: COMPONENT_MODULES
})
export class ModulesModule { }
