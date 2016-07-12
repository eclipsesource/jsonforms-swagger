import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ProjectsManagerService } from '../core/projects-manager/projects-manager.service';
import { Project } from '../core/model/project';

@Component({
    selector: 'projects-list',
    moduleId: module.id,
    templateUrl: 'projects-list.html',
    styleUrls: ['projects-list.css']
})
export class ProjectsListComponent implements OnInit {

    projects: Project[] = [];

    errorMessage: string;

    @Output() onProjectSelected = new EventEmitter<string>();

    constructor (private projectsService: ProjectsManagerService) { }

    ngOnInit() {
        this.subscribeToProjects();
    }

    private subscribeToProjects() {
        this.projectsService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error
            );
    }

    createProject(name: string, apiUrl: string) {
        this.projectsService.createProject(name, apiUrl);
    }

    selectProject(projectName: string) {
        this.onProjectSelected.emit(projectName);
    }

}
