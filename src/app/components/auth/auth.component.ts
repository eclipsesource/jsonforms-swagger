import {Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {AuthStrategy} from "./model/auth-strategy.component";
import {AuthStrategyComponent} from "./model/auth-strategy.component";
import {Dialog} from 'primeng/primeng';

@Component({
  selector: 'auth',
  template: require('./auth.html'),
  styles: [require('./auth.css')],
  directives: [AuthStrategyComponent, Dialog]
})
export class AuthComponent{
  displayDialog: boolean = false;
  strategiesToShow: string[] = [];

  constructor(private authService: AuthService){
    authService.openDialog.subscribe((lockIds: string[])=>{
      this.displayDialog = true;
      this.strategiesToShow = lockIds;
    });
  }

  showDialog(){
    this.strategiesToShow = [];
    this.displayDialog = true;
  }

  getStrategies(): any[]{
    var strategies: any = this.authService.authStrategies;
    if(this.strategiesToShow && this.strategiesToShow.length > 0){
      strategies = _.pick(strategies, this.strategiesToShow);
    }

    return _.values(strategies);
  }

}
