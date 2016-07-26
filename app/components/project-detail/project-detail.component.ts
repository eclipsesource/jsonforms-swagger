import {Component, Input, OnInit} from '@angular/core';

import { ProjectsManagerService } from '../core/projects-manager/projects-manager.service';
import { APIManagerService } from '../core/api-manager/api-manager.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { QueryComponent } from '../query/query.component';
import { ResponseComponent } from '../response/response.component';
import { ExplorerComponent } from '../explorer/explorer.component';

import { Project } from '../core/model/project';
import { API } from '../core/model/api';


@Component({
	selector: 'project-detail',
	moduleId: module.id,
	templateUrl: 'project-detail.html',
	styleUrls: ['project-detail.css'],
	providers: [
		OperationPerformerService
	],
	directives: [
		SidebarComponent,
		QueryComponent,
		ResponseComponent,
		ExplorerComponent
	]
})
export class ProjectDetailComponent implements OnInit {

	@Input() projectName:string;

	project:Project;

	api:API;

	constructor(private projectsService:ProjectsManagerService, private apiManagerService:APIManagerService) {
		apiManagerService.api.subscribe((api) => {
			this.api = api;
		});
	}

	ngOnInit() {
		this.projectsService.getProject(this.projectName).subscribe(project => {
			this.project = project;
			this.apiManagerService.generateAPI(this.project.apiUrl);
		});
	}
}