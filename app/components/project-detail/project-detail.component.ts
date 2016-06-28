import { Component, Input, OnInit } from '@angular/core';

import { ProjectsManagerService } from '../core/projects-manager/projects-manager.service';
import { APIManagerService } from '../core/api-manager/api-manager.service';
import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { QueryComponent } from '../query/query.component';
import { ResponseComponent } from '../response/response.component';

import { Project } from '../core/model/project';
import { API } from '../core/model/api';

@Component({
    selector: 'project-detail',
    moduleId: module.id,
    templateUrl: 'project-detail.component.html',
    styleUrls: ['project-detail.css'],
    providers: [
        APIManagerService,
        APIGeneratorService,
        OperationPerformerService
    ],
    directives: [
        SidebarComponent,
        QueryComponent,
        ResponseComponent
    ]
})
export class ProjectDetailComponent implements OnInit {

    @Input() projectName: string;

    project: Project;

    api: API;

    errorMessage: string;

    constructor(private projectsService: ProjectsManagerService, private apiManagerService: APIManagerService) {
    }

    ngOnInit() {
        this.projectsService.getProject(this.projectName).subscribe(project => {
            this.project = project;
            this.apiManagerService.setAPIUrl(this.project.apiUrl);
            this.subscribeToAPI();
        });
    }

    private subscribeToAPI() {
        this.apiManagerService.getAPI()
            .subscribe(
                api => this.api = api,
                error => this.errorMessage = <any>error
            );
    }

}
