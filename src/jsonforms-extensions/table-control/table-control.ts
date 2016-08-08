import {AbstractControl, PathResolver, Testers, schemaTypeIs, uiTypeIs, SchemaElement, IUISchemaElement} from '../../../node_modules/jsonforms/index';
//import './table-control.css';
import registerNewControl from '../extension';
import 'lodash';
import './table-control.css';

export class TableController extends AbstractControl {
    static $inject = ['$scope'];

    private selectedElement: any;
    private properties: any;
    private itemsData: any;
    private shownProperties: any;
    private itemSchema: any;

    constructor(scope: any){
        super(scope);
        const dataSchema = PathResolver.resolveSchema(this.schema, this.schemaPath);
        const data = PathResolver.resolveInstance(this.data, this.schemaPath);
        const uiSchema = this.uiSchema;
        this.selectedElement = null;
        this.properties = _.keys(dataSchema.items['properties']);
        this.itemsData = data;
        this.shownProperties = uiSchema['options']['primaryItems'];
        this.itemSchema = dataSchema.items;
    }

    moreInfo(element: any){
        this.selectedElement = element;
    }

    backToTable(){
        this.selectedElement = null;
    }
}

export function optionMatches(optionName: string, pred: (params: any) => boolean) {
    return (uiSchema: IUISchemaElement, schema: SchemaElement, data: any): boolean => {
        let options = uiSchema['options'];
        if (options === undefined) {
            return false;
        }
        return pred(options[optionName]);
    };
}

registerNewControl('table-control', TableController, `<jsonforms-control>
<table class="jsf-control-table" ng-show="vm.selectedElement === null">
<tr>
	<th ng-repeat="prop in vm.shownProperties">{{prop}}</th>
</tr>
<tr ng-repeat="row in vm.itemsData" ng-click="vm.moreInfo(row)">
<td ng-repeat="prop in vm.shownProperties">{{row[prop]}}</td>
</tr>
</table>
<div class="jsf-control-table-detail" ng-if="vm.selectedElement !== null">
<i class="fa fa-arrow-left" ng-click="vm.backToTable()"></i>
<jsonforms schema="vm.itemSchema" data="vm.selectedElement" />
	</div>
	</jsonforms-control>`,
     Testers.and(
         schemaTypeIs('array'),
         uiTypeIs('Control'),
         optionMatches('primaryItems',  _.isArray)
     )
);