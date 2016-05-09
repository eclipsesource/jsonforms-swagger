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
var PolarAreaChart = (function () {
    function PolarAreaChart(el, differs) {
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
        this.scaleShowLabelBackdrop = true;
        this.scaleBackdropColor = "rgba(255,255,255,0.75)";
        this.scaleBeginAtZero = true;
        this.scaleBackdropPaddingY = 2;
        this.scaleBackdropPaddingX = 2;
        this.scaleShowLine = true;
        this.segmentShowStroke = true;
        this.segmentStrokeColor = "#fff";
        this.segmentStrokeWidth = 2;
        this.animationSteps = 100;
        this.animationEasing = "easeOutBounce";
        this.animateRotate = true;
        this.animateScale = false;
        this.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";
        this.onSegmentsSelect = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    PolarAreaChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    PolarAreaChart.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes && this.initialized) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.initChart();
        }
    };
    PolarAreaChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    PolarAreaChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var segs = this.chart.getSegmentsAtEvent(event);
            if (segs) {
                this.onSegmentsSelect.next({ originalEvent: event, segments: segs });
            }
        }
    };
    PolarAreaChart.prototype.initChart = function () {
        if (this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).PolarArea(this.value, {
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
                scaleShowLabelBackdrop: this.scaleShowLabelBackdrop,
                scaleBackdropColor: this.scaleBackdropColor,
                scaleBeginAtZero: this.scaleBeginAtZero,
                scaleBackdropPaddingY: this.scaleBackdropPaddingY,
                scaleBackdropPaddingX: this.scaleBackdropPaddingX,
                scaleShowLine: this.scaleShowLine,
                segmentShowStroke: this.segmentShowStroke,
                segmentStrokeColor: this.segmentStrokeColor,
                segmentStrokeWidth: this.segmentStrokeWidth,
                animationSteps: this.animationSteps,
                animationEasing: this.animationEasing,
                animateRotate: this.animateRotate,
                animateScale: this.animateScale
            });
            if (this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "animation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "showScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleOverride", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleStepWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleStartValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleShowLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleIntegersOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "maintainAspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "showTooltips", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipFillColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipTitleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipTitleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipTitleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipTitleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipYPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipXPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipCaretSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipCornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "tooltipXOffset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "multiTooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PolarAreaChart.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleShowLabelBackdrop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "scaleBackdropColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleBeginAtZero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleBackdropPaddingY", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "scaleBackdropPaddingX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "scaleShowLine", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "segmentShowStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "segmentStrokeColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "segmentStrokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PolarAreaChart.prototype, "animationSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "animationEasing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "animateRotate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PolarAreaChart.prototype, "animateScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PolarAreaChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PolarAreaChart.prototype, "legendTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PolarAreaChart.prototype, "onSegmentsSelect", void 0);
    PolarAreaChart = __decorate([
        core_1.Component({
            selector: 'p-polarAreaChart',
            template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], PolarAreaChart);
    return PolarAreaChart;
})();
exports.PolarAreaChart = PolarAreaChart;
//# sourceMappingURL=polarareachart.js.map