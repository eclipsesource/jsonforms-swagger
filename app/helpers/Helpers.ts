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


export function addQueryToUrl(url: string, query: string, value: string): string{
  var res = "";
  if (url.indexOf('?') > 0) {
    res = url + '&' + query + '=' + value;
  } else {
    res = url + '?' + query + '=' + value;
  }
  return res;
}

export function queryIsAlreadyPresent(url: string, query: string): boolean{
  var qp: any;
  if (url.indexOf('?') > 0) {
    qp = url.substring(url.indexOf('?') + 1);
    var parts = qp.split('&');
    if(parts && parts.length > 0) {
      for(var i = 0; i < parts.length; i++) {
        var kv = parts[i].split('=');
        if(kv && kv.length > 0) {
          if (kv[0] === query) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
