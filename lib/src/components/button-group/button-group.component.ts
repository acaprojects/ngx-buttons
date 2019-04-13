import { Component, QueryList, AfterViewInit, Input, Output, EventEmitter, ContentChildren } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'a-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements AfterViewInit {
    /** CSS class to add to the root element */
    @Input() public klass = 'default';
    /** Index of the active button */
    @Input() public model: number;
    /** Emitter for changes to the active button */
    @Output() public modelChange = new EventEmitter<number>();

    /** Query list for the button which are children of the group */
    @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

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
                item.modelChange.subscribe(s => this.changed(item, s));
            }
        }
    }

    /**
     * Callback for state changes of one of the buttons
     * @param button Button with state change
     * @param state New state of the button
     */
    public changed(button: ButtonComponent, state: boolean) {
        if (!state) {
            this.model = -1;
        } else {
            if (this.buttons) {
                const list = this.buttons.toArray();
                list.forEach(i => (i.id !== button.id ? i.setState(false) : null));
                this.model = list.findIndex(i => i.id === button.id);
            }
        }
        this.modelChange.emit(this.model);
    }
}
