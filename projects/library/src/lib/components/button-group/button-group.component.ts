import { Component, QueryList, AfterViewInit, Input, Output, EventEmitter, ContentChildren, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AButtonComponent } from '../button/button.component';

type FIELD_TYPE = number;

@Component({
    selector: 'a-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AButtonGroupComponent),
            multi: true
        }
    ]
})
export class AButtonGroupComponent implements AfterViewInit, ControlValueAccessor {
    /** CSS class to add to the root element */
    @Input() public klass = 'default';

    /** Index of the active button */
    public index: FIELD_TYPE;

    /** Query list for the button which are children of the group */
    @ContentChildren(AButtonComponent) buttons: QueryList<AButtonComponent>;

    /** Form control on change handler */
    private _onChange: (_: FIELD_TYPE) => void;
    /** Form control on touch handler */
    private _onTouch: (_: FIELD_TYPE) => void;

    public ngAfterViewInit(): void {
        if (!this.buttons || this.buttons.toArray().length <= 0) {
            setTimeout(() => this.ngAfterViewInit(), 300);
            return;
        }
        const list = this.buttons.toArray();
        for (const item of list) {
            if (item) {
                item.group = true;
                item.klass = this.klass;
                item.setGroup();
                item.registerOnChange(s => this.changed(item, s));
            }
        }
    }

    /**
     * Callback for state changes of one of the buttons
     * @param button Button with state change
     * @param state New state of the button
     */
    public changed(button: AButtonComponent, state: boolean) {
        if (!state) {
            this.index = -1;
        } else {
            if (this.buttons) {
                const list = this.buttons.toArray();
                list.forEach(i => (i.id !== button.id ? i.setState(false) : null));
                this.index = list.findIndex(i => i.id === button.id);
            }
        }
        if (this._onChange) {
            this._onChange(this.index);
        }
    }

    /**
     * Update local value when form control value is changed
     * @param value The new value for the component
     */
    public writeValue(value: FIELD_TYPE) {
        this.index = value;
    }

    /**
     * Registers a callback function that is called when the control's value changes in the UI.
     * @param fn The callback function to register
     */
    public registerOnChange(fn: (_: FIELD_TYPE) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback function is called by the forms API on initialization to update the form model on blur.
     * @param fn The callback function to register
     */
    public registerOnTouched(fn: (_: FIELD_TYPE) => void): void {
        this._onTouch = fn;
    }
}
