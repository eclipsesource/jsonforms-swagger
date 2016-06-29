import {Component, Input} from '@angular/core';
import {AuthBasic} from "./AuthBasic";
import {compileToComponent} from '../../../../app/helpers/Helpers';
import {DynamicComponentLoader, ViewContainerRef} from "@angular/core";
import {AuthApiKey} from "./AuthApiKey";
import {AuthOauthImplicit} from "./AuthOauthImplicit";
import {AuthOauthPassword} from "./AuthOauthPassword";
import {AuthOauthCode} from "./AuthOauthCode";
import {AuthOauthApplication} from "./AuthOauthApplication";


@Component({
  selector: 'auth-strategy',
  template: ''
})
export class AuthStrategyComponent {
  @Input() strategy: AuthStrategy;

  constructor(private dcl: DynamicComponentLoader, private viewContainerRef: ViewContainerRef){
  }

  ngOnInit(){
    this.dcl.loadNextToLocation(compileToComponent(this.strategy.getTemplate(), this.strategy, ['../auth.css'], module.id), this.viewContainerRef)
  }
}

export interface AuthStrategy{
  getId(): string;
  login(): void;
  logout(): void;
  getTemplate():string;
  apply(obj: any):void;
  isLoggedIn(): boolean;
  getOther(): any;
}

export function generateFromDefinitions(definitions: any): { [id:string] : AuthStrategy}{
  var auths: { [id:string] : AuthStrategy} = {};

  for(var defName in definitions){
    if(definitions.hasOwnProperty(defName)){
      auths[defName] = createAuthStrategy(defName, definitions[defName]);
    }
  }
  return auths;
}


function createAuthStrategy(id: string, definition: any): any{
  if(!definition){
    return null;
  }
  var type = definition['type'];
  if(!type){
    return null;
  }

  switch(type){
    case 'apiKey': return new AuthApiKey(id, definition);
    case 'oauth2':
          var flow = definition['flow'];
          if(!flow){
            return null;
          }
          switch(flow){
            case 'implicit': return new AuthOauthImplicit(id, definition);
            case 'password': return new AuthOauthPassword(id, definition);
            case 'accessCode': return new AuthOauthCode(id, definition);
            case 'application': return new AuthOauthApplication(id, definition);
            default: return null;
          }
    case 'basic': return new AuthBasic(id, definition);
    default: return null;
  }
}
