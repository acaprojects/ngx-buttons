import {
    Component,
    Input,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnChanges,
    AfterViewInit,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type FIELD_TYPE = boolean;
@Component({
    selector: 'button[widget]',
    template: `
        <div class="wrapper" feedback (tapped)="tap()">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ButtonComponent),
            multi: true
        }
    ]
})
export class ButtonComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
    /** CSS class to add to the root element */
    @Input() public klass = 'default';
    /** Whether button is part of a group */
    @Input() public group: boolean;
    /** Event emitter for touch */
    @Output() public tapped = new EventEmitter();

    /** Toggle state of the button */
    public state: FIELD_TYPE;

    /** Unique identifier for the instance of the button component */
    readonly id: string = `button-${Math.floor(Math.random() * 999999)}`;

    /** Form control on change handler */
    private _onChange: (_: FIELD_TYPE) => void;
    /** Form control on touch handler */
    private _onTouch: (_: FIELD_TYPE) => void;

    constructor(private element: ElementRef<HTMLButtonElement>, private renderer: Renderer2) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.klass) {
            this.setClass(this.klass, changes.klass.previousValue);
        }
        if (changes.state) {
            this.setClass(this.state ? 'active' : '', this.state ? '' : 'active');
        }
        if (changes.group) {
            this.setGroup();
        }
    }

    public ngAfterViewInit(): void {
        this.setClass(this.klass);
    }

    /**
     * Add class to root element based off `klass` binding
     * @param old Old class to remove
     */
    public setClass(new_class?: string, old?: string) {
        if (this.element && this.element.nativeElement) {
            if (old) {
                this.renderer.removeClass(this.element.nativeElement, old);
            }
            if (new_class) {
                this.renderer.addClass(this.element.nativeElement, new_class);
            }
        }
    }

    /**
     * Add/remove group item attribute to button
     */
    public setGroup() {
        if (this.group) {
            this.renderer.setAttribute(this.element.nativeElement, 'group-item', '');
        } else {
            this.renderer.removeAttribute(this.element.nativeElement, 'group-item');
        }
    }

    public setState(state: boolean) {
        this.state = state;
        this.setClass(this.state ? 'active' : '', this.state ? '' : 'active');
    }

    /**
     * Callback for tapped events
     */
    public tap() {
        this.tapped.emit();
        if (this.state !== undefined || this.group) {
            this.setState(!this.state);
            if (this._onChange) {
                this._onChange(this.state);
            }
        }
    }

    /**
     * Update local value when form control value is changed
     * @param value The new value for the component
     */
    public writeValue(value: FIELD_TYPE) {
        this.state = value;
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
