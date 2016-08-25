import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { ProjectsManagerService } from '../core/projects-manager/projects-manager.service';
import { Project } from '../core/model/project';


@Component({
    selector: 'projects-list',
	moduleId: module.id,
    template: require('./projects-list.html'),
    styles: [require('./projects-list.css')]
})
export class ProjectsListComponent {

    @Input() projects: {[id: string] : Project} = {};
    @Output() onProjectSelected = new EventEmitter<any>();

    constructor (private projectsManagerService: ProjectsManagerService) { }

    createProject(name: string, apiUrl: string) {
        this.projectsManagerService.createProject(name, apiUrl);
    }

    selectProject(projectId: string) {
        this.onProjectSelected.emit({
            id: projectId,
            devMode: false
        });
    }

    selectProjectDev(projectId: string) {
        this.onProjectSelected.emit({
            id: projectId,
            devMode: true
        });
    }

    projectKeys(): string[] {
        return _.keys(this.projects);
    }

    getProject(key: string): Project{
        return this.projects[key];
    }

}
