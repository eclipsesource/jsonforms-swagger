import {Component, Input} from '@angular/core';
import {ElementRef} from "@angular/core";
import {AuthStrategy} from "./auth-strategy.component";


export class AuthOauthApplication implements AuthStrategy {
  public tempUsername: string;
  public tempPassword: string;

  username: string;
  password: string;
  url: string = "";

  loggedIn = false;


  constructor(private id: string, definition: any){
  }

  getTemplate():string{
    return "<div class='form-container'>" +
      "<input type='text' [(ngModel)]='scope.tempUsername' placeholder='Username' />" +
      "<input type='password' [(ngModel)]='scope.tempPassword' placeholder='Password' />" +
      "<div class='buttons-panel'>" +
      "<button (click)='scope.login()'>Log In</button>" +
      "<button (click)='scope.logout()'>Log Out</button>" +
      "</div>" +
      "</div>";
  }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

  getId(): string {
    return this.id;
  }

  getOther(): any{
    return null;
  }

  login(): void{
    this.username = this.tempUsername;
    this.password = this.tempPassword;
    this.loggedIn = true;
  }

  logout():void{
    this.tempPassword = "";
    this.tempUsername = "";
    this.username = "";
    this.password = "";
    this.loggedIn = false;
  }

  apply(obj: any): void {
    if(typeof obj.headers.Authorization === 'undefined') {
      obj.headers.Authorization = 'Basic ' + btoa(this.username + ':' + this.password);
    }

  }
}
