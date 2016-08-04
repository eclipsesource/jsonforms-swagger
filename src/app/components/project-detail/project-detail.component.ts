import {Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

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
	template: require('./project-detail.html'),
	styles: [require('./project-detail.css')],
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
export class ProjectDetailComponent implements OnInit, OnDestroy {

	@Input() projectName:string;
	@Input() devMode: boolean;

	project:Project;

	api:API;
	apiSubscription: Subscription;

	nullAPIMessage: string = 'Loading...';
	firstNullAPIReceived: boolean = false;

	constructor(private projectsService:ProjectsManagerService, private apiManagerService:APIManagerService) {
		this.apiSubscription = apiManagerService.api.subscribe((api) => {
			this.api = api;

			if (!api) {
				if (!this.firstNullAPIReceived) {
					this.firstNullAPIReceived = true;
				} else {
					this.nullAPIMessage = 'Error loading API';
				}
			}
		});
	}

	ngOnInit() {
		this.projectsService.getProject(this.projectName).subscribe(project => {
			this.project = project;
			this.apiManagerService.generateAPI(this.project.apiUrl, this.project.apiModel);
		});
	}

	ngOnDestroy() {
		this.apiSubscription.unsubscribe();
		this.apiManagerService.resetService();
		// At this moment, this.api is null, so we use this.apiManagerService.getCurrentAPI() instead
		if (this.apiManagerService.getCurrentAPI()) {
			this.project.apiModel = this.apiManagerService.getCurrentAPI().generateAPIModel();
		}
	}
}
