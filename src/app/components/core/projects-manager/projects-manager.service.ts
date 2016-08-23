import { Injectable } from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import {UserManagementService} from "../user-management/user-management.service";
import { Project } from '../model/project';

@Injectable()
export class ProjectsManagerService {
    private usersRef: any;
    private projectsRef: any;
    private user: any;
    private projectsModel: {[key:string]:Project};
    private _projects: BehaviorSubject<{[key:string]:Project}> = new BehaviorSubject(this.projectsModel);

    public projects = this._projects.asObservable();


    private currentUserProjectsRef: any;
    constructor (private firebaseService: FirebaseService, private userManagementService: UserManagementService) {
        this.usersRef = firebaseService.database.ref('users/');
        this.projectsRef = firebaseService.database.ref('projects/');

        this.userManagementService.user.subscribe((user: any)=>{
            this.user = user;
            this.projectsModel = {};
            this._projects.next(this.projectsModel);

            if(!user){
                this.currentUserProjectsRef = null;
                return;
            }

            this.currentUserProjectsRef = this.usersRef.child(user.uid + '/projects/');

            this.currentUserProjectsRef.on('child_added', (key: any)=>{
                this.projectsRef.child(key.val() + '/').on('value', (projectSnap: any)=>{
                    const projectConfig = projectSnap.val();
                    if(!projectConfig){
                        delete this.projectsModel[key.val()];
                        this._projects.next(this.projectsModel);
                        //TODO delete from database (user/[id]/projects)
                        return;
                    }
                    const project = new Project(projectConfig.name, projectConfig.url);

                    this.projectsModel[key.val()] = project;
                    this._projects.next(this.projectsModel);
                });
            });

            this.currentUserProjectsRef.on('child_removed', (key: any)=>{
                delete this.projectsModel[key.val()];
                this._projects.next(this.projectsModel);
            });
        });
    }

    getProjects(): Observable<{[id: string]: Project}> {
        return this.projects;
    }

    createProject(name: string, apiUrl: string) {
        let projectConfig = {
            name: name,
            url: apiUrl
        };
        this.projectsRef.push(projectConfig).then((ref:any)=>{
            const key = ref.key;
            this.currentUserProjectsRef.push(key);
        });
    }

    //TODO allow deletion of projects (delete from /projects/ and from /users/[id]/projects)
    /*
    deleteProject(id: string){

    }*/

}
