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
var BarChart = (function () {
    function BarChart(el, differs) {
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
        this.scaleBeginAtZero = true;
        this.scaleShowGridLines = true;
        this.scaleGridLineColor = "rgba(0,0,0,.05)";
        this.scaleGridLineWidth = 1;
        this.scaleShowHorizontalLines = true;
        this.scaleShowVerticalLines = true;
        this.barShowStroke = true;
        this.barStrokeWidth = 2;
        this.barValueSpacing = 5;
        this.barDatasetSpacing = 1;
        this.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";
        this.onBarsSelect = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    BarChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    BarChart.prototype.ngDoCheck = function () {
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
    BarChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    BarChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var activeBars = this.chart.getBarsAtEvent(event);
            if (activeBars) {
                this.onBarsSelect.next({ originalEvent: event, bars: activeBars });
            }
        }
    };
    BarChart.prototype.initChart = function () {
        if (this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).Bar(this.value, {
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
                scaleShowGridLines: this.scaleShowGridLines,
                scaleGridLineColor: this.scaleGridLineColor,
                scaleGridLineWidth: this.scaleGridLineWidth,
                scaleShowHorizontalLines: this.scaleShowHorizontalLines,
                scaleShowVerticalLines: this.scaleShowVerticalLines,
                barShowStroke: this.barShowStroke,
                barStrokeWidth: this.barStrokeWidth,
                barValueSpacing: this.barValueSpacing,
                barDatasetSpacing: this.barDatasetSpacing
            });
            if (this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "animation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "animationSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "animationEasing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "showScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleOverride", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleStepWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleStartValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleShowLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleIntegersOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "maintainAspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "showTooltips", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipFillColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipTitleFontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipTitleFontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipTitleFontStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipTitleFontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipYPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipXPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipCaretSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipCornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "tooltipXOffset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "multiTooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarChart.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleBeginAtZero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleShowGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "scaleGridLineColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "scaleGridLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleShowHorizontalLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "scaleShowVerticalLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarChart.prototype, "barShowStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "barStrokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "barValueSpacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BarChart.prototype, "barDatasetSpacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChart.prototype, "legendTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarChart.prototype, "onBarsSelect", void 0);
    BarChart = __decorate([
        core_1.Component({
            selector: 'p-barChart',
            template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], BarChart);
    return BarChart;
})();
exports.BarChart = BarChart;
//# sourceMappingURL=barchart.js.map