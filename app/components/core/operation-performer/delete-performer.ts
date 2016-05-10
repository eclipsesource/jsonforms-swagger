import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { IOperationPerformer } from './operation-performer.interface';

export class DeletePerformer implements IOperationPerformer {

  performOperation(http: Http, url: string, body: string, options: RequestOptions): Observable<Response> {
    return http.delete(url, options);
  }

}
