import {Injectable} from '@angular/core';
import {API} from "../core/model/api";
import {AuthStrategy} from "./model/auth-strategy.component";
import {Operation} from "../core/model/operation";

import {Subject} from "../../../node_modules/rxjs/Subject";
import { Observable } from 'rxjs/Observable';

import { APIManagerService } from '../core/api-manager/api-manager.service';
import {AuthApiKey} from "./model/AuthApiKey";
import {AuthBasic} from "./model/AuthBasic";

@Injectable()
export class AuthService {

    api:API;

    authStrategies:{ [id:string] : AuthStrategy} = {};

    private _openDialog:Subject<string[]> = new Subject<string[]>();
    openDialog:Observable<string[]> = this._openDialog.asObservable();


    constructor(apiManagerService:APIManagerService) {
        apiManagerService.api.subscribe((api:any)=> {
            this.api = api;
            this.reset();
        });

    }

    private reset() {
        if (this.api) {
            this.authStrategies = this.generateFromDefinitions(this.api['securityDefinitions']);
        }
    }

    hasLocks(operation:Operation):boolean {
        var locks = operation.getLocks();
        locks = _.filter(_.keys(locks), (lock)=> {
            return this.authStrategies[lock] != undefined;
        });
        return !!locks && locks.length;
    }

    openDialogForOperation(operation:Operation) {
        var lockIds = _.keys(operation.getLocks());

        this._openDialog.next(lockIds);
    }

    applyStrategies(operation:Operation):any {
        var strategies = operation.getLocks();
        var obj = {"parameters": {}, "headers": {}};

        for(let key in strategies){
            let value = strategies[key];
            // If the rule is defined, we procced to authenticate
            // If the rule is not defined, we ignore it
            if(this.authStrategies.hasOwnProperty(key)){
                if(this.authStrategies[key].isLoggedIn()){ //if logged in, apply auth
                    this.authStrategies[key].apply(obj);
                }else{//if not logged in, return false(not authenticated)
                    return false;
                }
            }
        }
        return obj;
    }

    private generateFromDefinitions(definitions:any):{ [id:string] : AuthStrategy} {
        var auths:{ [id:string] : AuthStrategy} = {};

        for (var defName in definitions) {
            if (definitions.hasOwnProperty(defName)) {
                var strat = this.createAuthStrategy(defName, definitions[defName]);
                if (strat) auths[defName] = strat;
            }
        }
        return auths;
    }

    // TODO Missing way to obtain client_id for oauth - it should be provided by the developer that creates the schema
    private createAuthStrategy(id:string, definition:any):any {
        if (!definition) {
            return null;
        }
        var type = definition['type'];
        if (!type) {
            return null;
        }

        switch (type) {
            case 'apiKey':
                return new AuthApiKey(id, definition);
            case 'basic':
                return new AuthBasic(id, definition);
            default:
                return null;
        }
    }

}
