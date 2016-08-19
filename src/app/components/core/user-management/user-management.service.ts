import {Injectable} from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";

@Injectable()
export class UserManagementService {
    constructor(private firebaseService: FirebaseService){
    }

    registerWithGithub(){

    }
}