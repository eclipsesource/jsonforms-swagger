import { Component, EventEmitter, Output } from '@angular/core';
import {AuthComponent} from "../auth/auth.component";
import {APIManagerService} from "../core/api-manager/api-manager.service";

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: 'header.html',
    styleUrls: ['header.css'],
    directives: [AuthComponent]
})
export class HeaderComponent {

    @Output() onProjectsListClicked = new EventEmitter<any>();

    gotoProjects() {
        this.onProjectsListClicked.emit(null);
    }

}
