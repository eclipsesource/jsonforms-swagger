import {Component, Input} from '@angular/core';
import {AuthBasic} from "./AuthBasic";
import {compileToComponent} from '../../../../app/helpers/Helpers';
import {DynamicComponentLoader, ViewContainerRef} from "@angular/core";

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
}
