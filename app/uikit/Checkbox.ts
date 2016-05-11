import {Component, Input, Output, EventEmitter} from "@angular/core";



@Component({
  selector: 'uik-checkbox',
  template: '<div class="container" (click)="onclick()"></div>',
  styles: [`
    .container{
        background-color: red;
        color: blue;
        width: 50px;
        height: 50px;
    }
  `]
})
export class Checkbox{

  @Input()
  backColor: string = 'red';

  @Input()
  frontColor: string = 'blue';

  @Input()
  initial: boolean = false;

  @Output()
  changed: EventEmitter<boolean> = new EventEmitter();

  state: boolean;

  ngOnInit(){
    this.state = this.initial;
    this.changed.emit(this.state);
  }

  onclick(){
    this.state = !this.state;
    this.changed.emit(this.state);
  }
}
