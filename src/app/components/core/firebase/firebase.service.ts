import {Injectable} from '@angular/core';
const firebase = require('firebase');
const firebaseConfig = require('/firebase.conf.js');

@Injectable()
export class FirebaseService {
    public app: any;
    constructor(){
        const firebaseConfig = {
            apiKey: firebaseConfig.apiKey,
            authDomain: firebaseConfig.authDomain,
            databaseURL: firebaseConfig.databaseURL,
            storageBucket: firebaseConfig.storageBucket
        };

        this.app = firebase.initializeApp(firebaseConfig);
    }
}