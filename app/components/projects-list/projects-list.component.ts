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

    @Output() onProjectSelected = new EventEmitter<any>();

    constructor (private projectsManagerService: ProjectsManagerService) { }

    ngOnInit() {
        this.subscribeToProjects();
    }

    private subscribeToProjects() {
        this.projectsManagerService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error
            );
    }

    createProject(name: string, apiUrl: string) {
        this.projectsManagerService.createProject(name, apiUrl);
    }

    selectProject(projectName: string) {
        this.onProjectSelected.emit({
            name: projectName,
            devMode: false
        });
    }

    selectProjectDev(projectName: string) {
        this.onProjectSelected.emit({
            name: projectName,
            devMode: true
        });
    }

}
