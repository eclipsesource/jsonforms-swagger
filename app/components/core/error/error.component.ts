import {Component, Input, ElementRef} from "@angular/core";
import {Observable} from "rxjs/Observable";


@Component({
  selector: "error",
  templateUrl: "error.html",
  styleUrls: ["error.css"],
  moduleId: module.id
})
export class ErrorComponent{
  @Input() errorStream: Observable<string>;
  @Input() duration: number = 2000;

  private errors: Error[] = [];
  constructor(private element: ElementRef){
  }
  ngOnInit(){
    if(this.errorStream){
      this.errorStream.subscribe((err)=>{
        var error = new Error(err);
        this.errors.push(error);
        setTimeout(()=>{
          this.errors.splice(this.errors.indexOf(error), 1);
        }, this.duration);
      });
    }
  }
}
