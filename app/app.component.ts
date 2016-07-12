import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

// Add the RxJS Observable operators we need in this app
import './rxjs-operators';

import { ProjectsManagerService } from './components/core/projects-manager/projects-manager.service';
import { AuthService } from './components/auth/auth.service';
import { APIManagerService } from './components/core/api-manager/api-manager.service';
import { APIGenerator } from './components/core/api-manager/api-generator';
import { ErrorService } from './components/error/error.service';

import { HeaderComponent } from './components/header/header.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ErrorComponent } from './components/error/error.component';

@Component({
	selector: 'app',
	moduleId: module.id,
	templateUrl: 'app.html',
	styleUrls: ['app.css'],
	providers: [
		HTTP_PROVIDERS,
		ProjectsManagerService,
		AuthService,
		APIManagerService,
		APIGenerator,
		ErrorService
	],
	directives: [
		HeaderComponent,
		ProjectsListComponent,
		ProjectDetailComponent,
		ErrorComponent
	]
})
export class AppComponent {

	selectedProjectName:string;

	onProjectSelected(projectName:string) {
		this.selectedProjectName = projectName;
	}

	onProjectsListClicked() {
		this.selectedProjectName = '';
	}

}
