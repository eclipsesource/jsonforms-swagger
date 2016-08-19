import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import {UserManagementService} from "../core/user-management/user-management.service";

@Component({
    selector: 'header',
    template: require('./header.html'),
    styles: [require('./header.css')],
    directives: [AuthComponent]
})
export class HeaderComponent {

    @Input() selectedProjectName: string;

    @Output() onProjectsListClicked = new EventEmitter<any>();
    private user: any;
	constructor(private userManagementService: UserManagementService) {
        userManagementService.user.subscribe((user: any)=>{
            this.user = user;
        });
	}

    gotoProjects() {
        this.onProjectsListClicked.emit(null);
    }

    loginWithGithub(){
        this.userManagementService.loginWithGithub();
    }

    logout(){
        this.userManagementService.logout();
    }

}
