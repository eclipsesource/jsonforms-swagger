import {Injectable} from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";
import {Subject, Observable} from 'rxjs/Rx';
let firebase = require('firebase');

@Injectable()
export class UserManagementService {
    private _user: Subject<any> = new Subject();
    public user: Observable<any> = this._user.asObservable();
    public token: any;


    constructor(private firebaseService: FirebaseService){
        firebaseService.auth.onAuthStateChanged((user: any)=>{
            this._user.next(user);
        });
    }

    loginWithGithub(){
        var provider = new firebase.auth.GithubAuthProvider();
        this.firebaseService.auth.signInWithPopup(provider).then((result: any)=>{
            this.token = result.credential.accessToken;
        }).catch((error: string)=>{
            throw new Error(error);
        });

    }

    logout(){
        this.firebaseService.auth.signOut();
    }
}