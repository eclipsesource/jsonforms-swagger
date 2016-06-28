import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

// Add the RxJS Observable operators we need in this app
import './rxjs-operators';

import { ProjectsManagerService } from './components/core/projects-manager/projects-manager.service';

import { HeaderComponent } from './components/header/header.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  providers: [
    HTTP_PROVIDERS,
    ProjectsManagerService
  ],
  directives: [
    HeaderComponent,
    ProjectsListComponent,
    ProjectDetailComponent
  ]
})
export class AppComponent {

  selectedProjectName: string;

  onProjectSelected(projectName: string) {
    this.selectedProjectName = projectName;
  }

  onProjectsListClicked() {
    this.selectedProjectName = '';
  }

}
