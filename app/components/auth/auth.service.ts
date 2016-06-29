import {Injectable} from '@angular/core';
import {APIGeneratorService} from "../core/api-generator/api-generator.service";
import {API} from "../core/model/api";
import {AuthStrategy, generateFromDefinitions} from "./model/auth-strategy.component";
import {Operation} from "../core/model/operation";

import {Subject} from "../../../node_modules/rxjs/Subject";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService{

  api: API;

  authStrategies:  { [id:string] : AuthStrategy} = {};

  private _openDialog: Subject<string[]> = new Subject<string[]>();
  openDialog: Observable<string[]> = this._openDialog.asObservable();


  constructor(apiGeneratorService: APIGeneratorService){
    apiGeneratorService.api.subscribe((api: any)=>{
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

    return !!locks;
  }

  openDialogForOperation(operation: Operation){
    var lockIds = _.keys(operation.getLocks());

    this._openDialog.next(lockIds);
  }

  applyStrategies(operation: Operation): any{
    var strategies = operation.getLocks();
    var obj = {"url": "", "headers": {}};
    for(let strat in strategies){
      if(this.authStrategies.hasOwnProperty(strat) && this.authStrategies[strat].isLoggedIn()){
        this.authStrategies[strat].apply(obj);
      }else{
        return false;
      }
    }
    return obj;
  }
}
