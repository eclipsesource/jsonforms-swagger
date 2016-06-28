import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: 'header.component.html',
    styleUrls: ['header.css']
})
export class HeaderComponent {

    @Output() onProjectsListClicked = new EventEmitter<any>();

    gotoProjects() {
        this.onProjectsListClicked.emit(null);
    }

}