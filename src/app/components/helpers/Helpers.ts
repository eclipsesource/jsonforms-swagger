import {Component} from "@angular/core";

export function compileToComponent(template: any, scope?: any, styles?: string[], moduleId?: any, directives?: any) {
  @Component({
    selector: 'fake',
    template , directives, styles, moduleId
  })
  class FakeComponent{
    scope: any = scope;
  }
  return FakeComponent;
}
