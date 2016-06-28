import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Project } from '../model/project';

@Injectable()
export class ProjectsManagerService {

    constructor (private http: Http) { }

    private projectsUrl = 'app/projects.json';

    projects: Project[]; // TODO: projects as observable subject

    getProjects(): Observable<Project[]> {
        if (!this.projects) {
            return this.http.get(this.projectsUrl)
                .map(res => {
                    return this.extractData(res);
                })
                .catch(this.handleError);
        } else {
            return Observable.of(this.projects);
        }
    }

    getProject(name: string): Observable<Project> {
        return this.getProjects()
            .map(projects => {
                return _.find(projects, project => {
                    return name == project.name;
                });
            });
    }

    createProject(name: string, apiUrl: string) {
        this.projects.push(new Project(name, apiUrl));
    }

    private extractData(res: Response) {
        let body = res.json();
        this.projects = body.data;
        return this.projects;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}