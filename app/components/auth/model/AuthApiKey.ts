import {Component, Input} from '@angular/core';
import {ElementRef} from "@angular/core";
import {AuthStrategy} from "./auth-strategy.component";
import {addQueryToUrl, queryIsAlreadyPresent} from "../../../../app/helpers/Helpers";

export class AuthApiKey implements AuthStrategy {
  public name: string;
  in: string;

  public tempKey: string;
  key: string;

  url: string = "";

  loggedIn = false;


  constructor(private id: string, definition: any){
    if(!definition || !definition['name'] || !definition['in']){
      throw new Error("Invalid arguments in AuthApiKey");
    }
    this.name = definition['name'];
    this.in = definition['in'];
  }

  getTemplate():string{
    return "<div class='form-container'>" +
      "<label for='__auth_api_key_input__' >{{scope.name}}</label>" +
      "<input [disabled]='scope.isLoggedIn()' id='__auth_api_key_input__' type='text' [(ngModel)]='scope.tempKey' placeholder='Key' />" +
      "<div class='buttons-panel'>" +
      "<button *ngIf='!scope.isLoggedIn()' (click)='scope.login()'>Log In</button>" +
      "<button *ngIf='scope.isLoggedIn()' (click)='scope.logout()'>Log Out</button>" +
      "</div>" +
      "</div>";
  }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

  getId(): string {
    return this.id;
  }

  login(): void{
    if(this.tempKey){
      this.key = this.tempKey;
      this.loggedIn = true;
    }
  }

  logout():void{
    this.key = "";
    this.tempKey = "";
    this.loggedIn = false;
  }

  // this function doesn't override values if they are already present in the query/header
  apply(obj: any): void {
    if(this.in === "query"){
      if(typeof obj.parameters[this.name] === 'undefined') {
        obj.parameters[this.name] = this.key;
      }
    }else{ // header
      if(typeof obj.headers[this.name] === 'undefined') {
        obj.headers[this.name] = this.key;
      }
    }
  }
}
