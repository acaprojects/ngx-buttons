import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import * as dayjs from 'dayjs';

@Component({
    selector: 'app-root',
    templateUrl: `./app.component.html`,
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public model: { [name: string]: any } = {};

    public ngOnInit(): void {
        this.model.count = 0;
    }

    public reset() {
        this.model.date = dayjs().valueOf();
    }
}
