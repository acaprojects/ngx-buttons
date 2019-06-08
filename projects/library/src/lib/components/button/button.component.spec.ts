
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ACustomEventsModule } from '@acaprojects/ngx-custom-events';
import { AButtonComponent } from './button.component';

describe('AButtonComponent', () => {
    let fixture: ComponentFixture<AButtonComponent>;
    let component: AButtonComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AButtonComponent
            ],
            imports: [CommonModule, ACustomEventsModule, FormsModule, ScrollingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(AButtonComponent);
        component = fixture.debugElement.componentInstance;
        clock = jasmine.clock();
        fixture.detectChanges();
        clock.uninstall();
        clock.install();
    });

    afterEach(() => {
        clock.uninstall();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    // TODO: add tests
});
