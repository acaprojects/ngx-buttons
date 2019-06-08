
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ACustomEventsModule } from '@acaprojects/ngx-custom-events';
import { AButtonGroupComponent } from './button-group.component';

describe('AButtonGroupComponent', () => {
    let fixture: ComponentFixture<AButtonGroupComponent>;
    let component: AButtonGroupComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AButtonGroupComponent
            ],
            imports: [CommonModule, ACustomEventsModule, FormsModule, ScrollingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(AButtonGroupComponent);
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
