import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import {UserManagementService} from "../core/user-management/user-management.service";
import {ProjectsManagerService} from "../core/projects-manager/projects-manager.service";

@Component({
    selector: 'header',
    template: require('./header.html'),
    styles: [require('./header.css')],
    directives: [AuthComponent]
})
export class HeaderComponent {

    @Input() selectedProject: string;

    @Output() onProjectsListClicked = new EventEmitter<any>();
    private user: any;
	constructor(private userManagementService: UserManagementService, private projectsManagerService: ProjectsManagerService) {
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
