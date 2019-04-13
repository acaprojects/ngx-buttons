import {
    Component,
    Input,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnChanges,
    AfterViewInit,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'button[widget]',
    template: `
        <div class="wrapper" feedback (tapped)="tap()">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges, AfterViewInit {
    /** CSS class to add to the root element */
    @Input() public klass = 'default';
    /** Active state of the button */
    @Input() public model: boolean;
    /** Whether button is part of a group */
    @Input() public group: boolean;
    /** Event emitter for changes to active state */
    @Output() public modelChange = new EventEmitter<boolean>();
    /** Event emitter for touch */
    @Output() public tapped = new EventEmitter();

    readonly id: string = `button-${Math.floor(Math.random() * 999999)}`;

    constructor(private element: ElementRef<HTMLButtonElement>, private renderer: Renderer2) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.klass) {
            this.setClass(this.klass, changes.klass.previousValue);
        }
        if (changes.model) {
            this.setClass(this.model ? 'active' : '', this.model ? '' : 'active');
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
        this.model = state;
        this.setClass(this.model ? 'active' : '', this.model ? '' : 'active');
    }

    /**
     * Callback for tapped events
     */
    public tap() {
        this.tapped.emit();
        if (this.model !== undefined || this.group) {
            this.setState(!this.model);
            this.modelChange.emit(this.model);
        }
    }
}
