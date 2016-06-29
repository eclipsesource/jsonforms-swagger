import {Component} from "@angular/core";

export function compileToComponent(template: any, scope?: any, styleUrls?: string[], moduleId?: any, directives?: any) {
  @Component({
    selector: 'fake',
    template , directives, styleUrls, moduleId
  })
  class FakeComponent{
    scope: any = scope;
  }
  return FakeComponent;
}
