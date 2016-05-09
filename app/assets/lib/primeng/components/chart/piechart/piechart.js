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
var PieChart = (function () {
    function PieChart(el, differs) {
        this.el = el;
        this.animation = true;
        this.showScale = true;
        this.scaleOverride = false;
        this.scaleSteps = null;
        this.scaleStepWidth = null;
        this.scaleStartValue = null;
        this.scaleLineColor = 'rgba(0,0,0,.1)';
        this.scaleLineWidth = 1;
        this.scaleShowLabels = true;
        this.scaleLabel = '<%=value%>';
        this.scaleIntegersOnly = true;
        this.scaleBeginAtZero = false;
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
        this.segmentShowStroke = true;
        this.segmentStrokeColor = '#fff';
        this.segmentStrokeWidth = 2;
        this.percentageInnerCutout = 0;
        this.animationSteps = 100;
        this.animationEasing = 'easeOutBounce';
        this.animateRotate = true;
        this.animateScale = false;
        this.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";
        this.onSegmentsSelect = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    PieChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    PieChart.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes && this.initialized) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.initChart();
        }
    };
    PieChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    PieChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var segs = this.chart.getSegmentsAtEvent(event);
            if (segs) {
                this.onSegmentsSelect.next({ originalEvent: event, segments: segs });
            }
        }
    };
    PieChart.prototype.initChart = function () {
        if (this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).Pie(this.value, {
                animation: this.animation,
                showScale: this.showScale,
                scaleOverride: this.scaleOverride,
                scaleSteps: this.scaleSteps,
                scaleStepWidth: this.scaleStepWidth,
                scaleStartValue: this.scaleStartValue,
                scaleLineColor: this.scaleLineColor,
                scaleLineWidth: this.scaleLineWidth,
                scaleLabel: this.scaleLabel,
                scaleShowLabels: this.scaleShowLabels,
                scaleIntegersOnly: this.scaleIntegersOnly,
                scaleBeginAtZero: this.scaleBeginAtZero,
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
                segmentShowStroke: this.segmentShowStroke,
                segmentStrokeColor: this.segmentStrokeColor,
                segmentStrokeWidth: this.segmentStrokeWidth,
                percentageInnerCutout: this.percentageInnerCutout,
                animationSteps: this.animationSteps,
                animationEasing: this.animationEasing,
                animateRotate: this.animateRotate,
                animateScale: this.animateScale,
                legendTemplate: this.legendTemplate
            });
            if (this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "animation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "showScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "scaleOverride", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "scaleSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "scaleStepWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "scaleStartValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "scaleLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "scaleLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "scaleShowLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "scaleLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "scaleIntegersOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "scaleBeginAtZero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "scaleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "scaleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "scaleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "scaleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "maintainAspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "showTooltips", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipFillColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipTitleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipTitleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipTitleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipTitleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipYPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipXPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipCaretSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipCornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "tooltipXOffset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "multiTooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PieChart.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "segmentShowStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "segmentStrokeColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "segmentStrokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "percentageInnerCutout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieChart.prototype, "animationSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "animationEasing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "animateRotate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "animateScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PieChart.prototype, "legendTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PieChart.prototype, "onSegmentsSelect", void 0);
    PieChart = __decorate([
        core_1.Component({
            selector: 'p-pieChart',
            template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], PieChart);
    return PieChart;
})();
exports.PieChart = PieChart;
//# sourceMappingURL=piechart.js.map