import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from "../core/model/operation";

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
    transform(initial: Operation[], filter: string): Operation[] {
        return initial.filter((operation)=>{
            return operation.getTypeAndPath().includes(filter);
        });
    }
}