import {Injectable} from '@angular/core';
import {API} from "../core/model/api";
import {AuthStrategy, generateFromDefinitions} from "./model/auth-strategy.component";
import {Operation} from "../core/model/operation";

import {Subject} from "../../../node_modules/rxjs/Subject";
import { Observable } from 'rxjs/Observable';

import { APIManagerService } from '../core/api-manager/api-manager.service';

@Injectable()
export class AuthService{

  api: API;

  authStrategies:  { [id:string] : AuthStrategy} = {};

  private _openDialog: Subject<string[]> = new Subject<string[]>();
  openDialog: Observable<string[]> = this._openDialog.asObservable();


  constructor(apiManagerService: APIManagerService){
    apiManagerService.api.subscribe((api: any)=>{
      this.api = api;
      this.reset();
    });

  }

  reset(){
    if(this.api){
      this.authStrategies = generateFromDefinitions(this.api['securityDefinitions']);
    }
  }

  isLocked(operation: Operation): boolean{
    var locks = operation.getLocks();
    for(let lockName in locks) {
      if (locks.hasOwnProperty(lockName)) {
        var authStrategy:AuthStrategy = this.authStrategies[lockName];
        if (!authStrategy) {
          continue; // the security spec is not defined
        }
        if (!authStrategy.isLoggedIn()) {
          return true; // when one authStrategy is found and it isn't logged in, the operation is locked


        } else {
          // TODO handle oauth using the authStrategy.getOther() method
          if (typeof locks[lockName] === 'array') { //oauth specific
            var scopes = locks[lockName];
            var availableScopes = authStrategy.getOther().scopes;
            if (!scopes.every(function (val: any) {
                return availableScopes.indexOf(val) >= 0;
              })) {
              return true; // when not all scopes are included
            }
          }
        }
      }
    }
    return false;
  }

  hasLocks(operation: Operation): boolean {
    var locks = operation.getLocks();
    locks = _.filter(_.keys(locks), (lock)=>{
      return this.authStrategies[lock] != undefined;
    });
    return !!locks && locks.length;
  }

  openDialogForOperation(operation: Operation){
    var lockIds = _.keys(operation.getLocks());

    this._openDialog.next(lockIds);
  }

  applyStrategies(operation: Operation): any{
    var strategies = operation.getLocks();
    strategies = _.filter(_.keys(strategies), (lock)=>{
      return this.authStrategies[lock] != undefined;
    });

    var obj = {"url": "", "headers": {}};
    for(let strat in strategies){
      if(this.authStrategies.hasOwnProperty(strat) && this.authStrategies[strat].isLoggedIn()){
        this.authStrategies[strat].apply(obj);
      }
    }
    return obj;
  }
}
