import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ACustomEventsModule } from '@acaprojects/ngx-custom-events';

import { version } from './settings';

import * as dayjs_api from 'dayjs';
const dayjs = dayjs_api;

import { AButtonComponent } from './components/button/button.component';
import { AButtonGroupComponent } from './components/button-group/button-group.component';


@NgModule({
    declarations: [
        AButtonComponent,
        AButtonGroupComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, ACustomEventsModule],
    exports: [
        AButtonComponent,
        AButtonGroupComponent
    ]
})
export class LibraryModule {
    public static version = 'local-dev';
    private static init = false;
    readonly build = dayjs();

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_BUTTONS_MODULE };
export { LibraryModule as AButtonsModule };
