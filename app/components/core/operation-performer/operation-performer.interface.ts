import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

export interface IOperationPerformer {

  performOperation(http: Http, url: string, body: string, options: RequestOptions): Observable<Response>;

}
