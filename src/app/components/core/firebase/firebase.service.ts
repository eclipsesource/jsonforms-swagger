import {Injectable} from '@angular/core';
const firebase = require('firebase');
const firebaseConfig: any = require('../../../../../firebase.conf.js');

@Injectable()
export class FirebaseService {
    public app: any;
    public auth: any;
    public database: any;

    constructor(){
        const conf = {
            apiKey: firebaseConfig.apiKey,
            authDomain: firebaseConfig.authDomain,
            databaseURL: firebaseConfig.databaseURL,
            storageBucket: firebaseConfig.storageBucket
        };

        this.app = firebase.initializeApp(conf);

        this.auth = firebase.auth();
        this.database = firebase.database();
    }

}