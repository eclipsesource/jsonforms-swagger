var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var RadarChart = (function () {
    function RadarChart(el, differs) {
        this.el = el;
        this.animation = true;
        this.animationSteps = 60;
        this.animationEasing = "easeOutQuart";
        this.showScale = true;
        this.scaleOverride = false;
        this.scaleSteps = null;
        this.scaleStepWidth = null;
        this.scaleStartValue = null;
        this.scaleLineColor = 'rgba(0,0,0,.1)';
        this.scaleLineWidth = 1;
        this.scaleLabel = '<%=value%>';
        this.scaleIntegersOnly = true;
        this.scaleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
        this.scaleFontSize = 12;
        this.scaleFontStyle = 'normal';
        this.scaleFontColor = '#666';
        this.responsive = false;
        this.maintainAspectRatio = true;
        this.showTooltips = true;
        this.tooltipFillColor = 'rgba(0,0,0,0.8)';
        this.tooltipFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
        this.tooltipFontSize = 14;
        this.tooltipFontStyle = 'normal';
        this.tooltipFontColor = '#fff';
        this.tooltipTitleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
        this.tooltipTitleFontSize = 14;
        this.tooltipTitleFontStyle = 'bold';
        this.tooltipTitleFontColor = '#fff';
        this.tooltipYPadding = 6;
        this.tooltipXPadding = 6;
        this.tooltipCaretSize = 8;
        this.tooltipCornerRadius = 6;
        this.tooltipXOffset = 10;
        this.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>";
        this.multiTooltipTemplate = "<%= value %>";
        this.scaleShowLine = true;
        this.angleShowLineOut = true;
        this.scaleShowLabels = false;
        this.scaleBeginAtZero = true;
        this.angleLineColor = "rgba(0,0,0,.1)";
        this.angleLineWidth = 1;
        this.pointLabelFontFamily = "'Arial'";
        this.pointLabelFontStyle = "normal";
        this.pointLabelFontSize = 10;
        this.pointLabelFontColor = "#666";
        this.pointDot = true;
        this.pointDotRadius = 3;
        this.pointDotStrokeWidth = 1;
        this.pointHitDetectionRadius = 20;
        this.datasetStroke = true;
        this.datasetStrokeWidth = 2;
        this.datasetFill = true;
        this.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";
        this.onPointsSelect = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    RadarChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    RadarChart.prototype.ngDoCheck = function () {
        var changes = null;
        try {
            changes = this.differ.diff(this.value);
        }
        catch (e) {
            if (this.value) {
                changes = this.differ.diff(this.value.datasets);
            }
        }
        if (changes && this.initialized) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.initChart();
        }
    };
    RadarChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    RadarChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var activePoints = this.chart.getPointsAtEvent(event);
            if (activePoints) {
                this.onPointsSelect.next({ originalEvent: event, points: activePoints });
            }
        }
    };
    RadarChart.prototype.initChart = function () {
        if (this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).Radar(this.value, {
                animation: this.animation,
                animationSteps: this.animationSteps,
                animationEasing: this.animationEasing,
                showScale: this.showScale,
                scaleOverride: this.scaleOverride,
                scaleSteps: this.scaleSteps,
                scaleStepWidth: this.scaleStepWidth,
                scaleStartValue: this.scaleStartValue,
                scaleLineColor: this.scaleLineColor,
                scaleLineWidth: this.scaleLineWidth,
                scaleLabel: this.scaleLabel,
                scaleIntegersOnly: this.scaleIntegersOnly,
                scaleFontFamily: this.scaleFontFamily,
                scaleFontSize: this.scaleFontSize,
                scaleFontStyle: this.scaleFontStyle,
                scaleFontColor: this.scaleFontColor,
                responsive: this.responsive,
                maintainAspectRatio: this.maintainAspectRatio,
                showTooltips: this.showTooltips,
                tooltipFillColor: this.tooltipFillColor,
                tooltipFontFamily: this.tooltipFontFamily,
                tooltipFontSize: this.tooltipFontSize,
                tooltipFontStyle: this.tooltipFontStyle,
                tooltipFontColor: this.tooltipFontColor,
                tooltipTitleFontFamily: this.tooltipTitleFontFamily,
                tooltipTitleFontSize: this.tooltipTitleFontSize,
                tooltipTitleFontStyle: this.tooltipTitleFontStyle,
                tooltipTitleFontColor: this.tooltipTitleFontColor,
                tooltipYPadding: this.tooltipYPadding,
                tooltipXPadding: this.tooltipXPadding,
                tooltipCaretSize: this.tooltipCaretSize,
                tooltipCornerRadius: this.tooltipCornerRadius,
                tooltipXOffset: this.tooltipXOffset,
                tooltipTemplate: this.tooltipTemplate,
                multiTooltipTemplate: this.multiTooltipTemplate,
                scaleShowLine: this.scaleShowLine,
                angleShowLineOut: this.angleShowLineOut,
                scaleShowLabels: this.scaleShowLabels,
                scaleBeginAtZero: this.scaleBeginAtZero,
                angleLineColor: this.angleLineColor,
                angleLineWidth: this.angleLineWidth,
                pointLabelFontFamily: this.pointLabelFontFamily,
                pointLabelFontStyle: this.pointLabelFontStyle,
                pointLabelFontSize: this.pointLabelFontSize,
                pointLabelFontColor: this.pointLabelFontColor,
                pointDot: this.pointDot,
                pointDotRadius: this.pointDotRadius,
                pointDotStrokeWidth: this.pointDotStrokeWidth,
                pointHitDetectionRadius: this.pointHitDetectionRadius,
                datasetStroke: this.datasetStroke,
                datasetStrokeWidth: this.datasetStrokeWidth,
                datasetFill: this.datasetFill
            });
            if (this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "animation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "animationSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "animationEasing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "showScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "scaleOverride", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "scaleSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "scaleStepWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "scaleStartValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "scaleLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "scaleLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "scaleLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "scaleIntegersOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "scaleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "scaleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "scaleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "scaleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "maintainAspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "showTooltips", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipFillColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipTitleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipTitleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipTitleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipTitleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipYPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipXPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipCaretSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipCornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "tooltipXOffset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "multiTooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadarChart.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "scaleShowLine", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "angleShowLineOut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "scaleShowLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "scaleBeginAtZero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "angleLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "angleLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "pointLabelFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "pointLabelFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "pointLabelFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "pointLabelFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "pointDot", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "pointDotRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "pointDotStrokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "pointHitDetectionRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "datasetStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RadarChart.prototype, "datasetStrokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadarChart.prototype, "datasetFill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadarChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadarChart.prototype, "legendTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadarChart.prototype, "onPointsSelect", void 0);
    RadarChart = __decorate([
        core_1.Component({
            selector: 'p-radarChart',
            template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], RadarChart);
    return RadarChart;
})();
exports.RadarChart = RadarChart;
//# sourceMappingURL=radarchart.js.map