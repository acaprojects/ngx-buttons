import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnChanges,
    AfterViewInit,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'button[widget]',
    template: `
        <div class="wrapper" feedback (tapped)="tapped.emit($event)">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges, AfterViewInit {
    /** CSS class to add to the root element */
    @Input() public klass = 'default';
    /** Event emitter for touch */
    @Output() public tapped = new EventEmitter();

    constructor(private element: ElementRef<HTMLButtonElement>, private renderer: Renderer2) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.klass) {
            this.setClass(changes.klass.previousValue);
        }
    }

    public ngAfterViewInit(): void {
        this.setClass();
    }

    /**
     * Add class to root element based off `klass` binding
     * @param old Old class to remove
     */
    public setClass(old?: string) {
        if (this.element && this.element.nativeElement) {
            if (old) {
                this.renderer.removeClass(this.element.nativeElement, old);
            }
            this.renderer.addClass(this.element.nativeElement, this.klass);
        }
    }
}
