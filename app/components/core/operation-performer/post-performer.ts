import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { IOperationPerformer } from './operation-performer.interface';

export class PostPerformer implements IOperationPerformer {

  performOperation(http: Http, url: string, body: string, options: RequestOptions): Observable<Response> {
    return http.post(url, body, options);
  }

}
