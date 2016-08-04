import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';

@Component({
    selector: 'header',
    template: require('./header.html'),
    styles: [require('./header.css')],
    directives: [AuthComponent]
})
export class HeaderComponent {

    @Input() selectedProjectName: string;

    @Output() onProjectsListClicked = new EventEmitter<any>();

	constructor() {
	}

    gotoProjects() {

        this.onProjectsListClicked.emit(null);
    }

}
