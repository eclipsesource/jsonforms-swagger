declare var angular: any;
const app = angular.module('jsonforms.renderers.controls');

export default function(name: any, controller: any, template: any, tester: any){
    app.directive(camelize(name), () => {
        return {
            restrict: 'E',
            template: template,
            controller: controller,
            controllerAs: 'vm'
        }
    });
    app.run(['RendererService', function (RendererService: any) {
        RendererService.register(name, tester, 100);
    }]);
}


function camelize(str: any) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match: any, p1: any, p2: any) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}