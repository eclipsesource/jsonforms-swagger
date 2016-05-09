var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var column_1 = require('../column/column');
var columntemplateloader_1 = require('../column/columntemplateloader');
var header_1 = require('../common/header');
var footer_1 = require('../common/footer');
var paginator_1 = require('../paginator/paginator');
var inputtext_1 = require('../inputtext/inputtext');
var domhandler_1 = require('../dom/domhandler');
var DataTable = (function () {
    function DataTable(el, domHandler, differs, cols, renderer) {
        var _this = this;
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.pageLinks = 5;
        this.selectionChange = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onRowDblclick = new core_1.EventEmitter();
        this.filterDelay = 300;
        this.onLazyLoad = new core_1.EventEmitter();
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.sortMode = 'single';
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.filters = {};
        this.columnsUpdated = false;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
            }
        };
        this.differ = differs.find([]).create(null);
        cols.changes.subscribe(function (_) {
            _this.columns = cols.toArray();
            _this.columnsUpdated = true;
        });
    }
    DataTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.next({
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: null,
                multiSortMeta: this.multiSortMeta
            });
        }
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        if (this.columnsUpdated) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }
            if (this.reorderableColumns) {
                this.initColumnReordering();
            }
            if (this.scrollable) {
                this.initScrolling();
            }
            this.columnsUpdated = false;
        }
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', function () {
                _this.filterTimeout = setTimeout(function () {
                    _this.filter();
                    _this.filterTimeout = null;
                }, _this.filterDelay);
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
            if (!this.lazy && !this.sortedByDefault && (this.sortField || this.multiSortMeta)) {
                this.sortByDefault();
                this.sortedByDefault = true;
            }
        }
    };
    DataTable.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    DataTable.prototype.sortByDefault = function () {
        if (this.sortMode == 'single')
            this.sortSingle();
        else if (this.sortMode == 'multiple')
            this.sortMultiple();
    };
    DataTable.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataTable.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataTable.prototype.sort = function (event, column) {
        if (!column.sortable) {
            return;
        }
        this.sortOrder = (this.sortField === column.field) ? this.sortOrder * -1 : 1;
        this.sortField = column.field;
        var metaKey = event.metaKey || event.ctrlKey;
        if (this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            if (this.sortMode == 'multiple') {
                if (!metaKey) {
                    this.multiSortMeta = [];
                }
                this.addSortMeta({ field: this.sortField, order: this.sortOrder });
                this.sortMultiple();
            }
            else {
                this.sortSingle();
            }
        }
    };
    DataTable.prototype.sortSingle = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                var value1 = _this.resolveFieldData(data1, _this.sortField);
                var value2 = _this.resolveFieldData(data2, _this.sortField);
                var result = null;
                if (value1 instanceof String && value2 instanceof String)
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (_this.sortOrder * result);
            });
            this.first = 0;
            if (this.hasFilter())
                this.filter();
            else
                this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.sortMultiple = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
            });
            if (this.hasFilter())
                this.filter();
            else
                this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    DataTable.prototype.addSortMeta = function (meta) {
        var index = -1;
        for (var i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    };
    DataTable.prototype.isSorted = function (column) {
        if (this.sortMode === 'single') {
            return (this.sortField && column.field === this.sortField);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    DataTable.prototype.getSortOrder = function (column) {
        var order = 0;
        if (this.sortMode === 'single') {
            if (this.sortField && column.field === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    };
    DataTable.prototype.onRowClick = function (event, rowData) {
        if (!this.selectionMode) {
            return;
        }
        var selectionIndex = this.findIndexInSelection(rowData);
        var selected = selectionIndex != -1;
        var metaKey = (event.metaKey || event.ctrlKey);
        if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.next(null);
            }
            else {
                this.selection.splice(selectionIndex, 1);
                this.selectionChange.next(this.selection);
            }
            this.onRowUnselect.next({ originalEvent: event, data: rowData });
        }
        else {
            if (this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.next(rowData);
            }
            else if (this.isMultipleSelectionMode()) {
                this.selection = (!metaKey) ? [] : this.selection || [];
                this.selection.push(rowData);
                this.selectionChange.next(this.selection);
            }
            this.onRowSelect.next({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.rowDblclick = function (event, rowData) {
        this.onRowDblclick.next({ originalEvent: event, data: rowData });
    };
    DataTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    DataTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    DataTable.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection == rowData) ? 0 : -1;
            }
            else if (this.isMultipleSelectionMode()) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == rowData) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    DataTable.prototype.isSelected = function (rowData) {
        return this.findIndexInSelection(rowData) != -1;
    };
    DataTable.prototype.onFilterKeyup = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.filterTimeout = setTimeout(function () {
            _this.filters[field] = { value: value, matchMode: matchMode };
            _this.filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    DataTable.prototype.filter = function () {
        if (this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];
            for (var i = 0; i < this.value.length; i++) {
                var localMatch = true;
                var globalMatch = false;
                for (var j = 0; j < this.columns.length; j++) {
                    var col = this.columns[j], filterMeta = this.filters[col.field];
                    //local
                    if (filterMeta) {
                        var filterValue = filterMeta.value, filterField = col.field, filterMatchMode = filterMeta.matchMode || 'startsWith', dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }
                        if (!localMatch) {
                            break;
                        }
                    }
                    //global
                    if (this.globalFilter && !globalMatch && col.filter) {
                        globalMatch = this.filterConstraints['contains'](this.value[i][col.field], this.globalFilter.value);
                    }
                }
                var matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }
                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
    };
    DataTable.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    DataTable.prototype.onFilterInputClick = function (event) {
        event.stopPropagation();
    };
    DataTable.prototype.switchCellToEditMode = function (element, column, rowData) {
        if (!this.selectionMode && this.editable && column.editable) {
            this.onEditInit.next({ column: column, data: rowData });
            var cell = this.findCell(element);
            if (!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                this.domHandler.addClass(cell, 'ui-cell-editing');
                this.domHandler.addClass(cell, 'ui-state-highlight');
                var editor = cell.querySelector('.ui-cell-editor').focus();
            }
        }
    };
    DataTable.prototype.switchCellToViewMode = function (element, column, rowData, complete) {
        if (this.editable) {
            if (this.preventBlurOnEdit) {
                this.preventBlurOnEdit = false;
            }
            else {
                if (complete)
                    this.onEditComplete.next({ column: column, data: rowData });
                else
                    this.onEditCancel.next({ column: column, data: rowData });
                var cell = this.findCell(element);
                this.domHandler.removeClass(cell, 'ui-cell-editing');
                this.domHandler.removeClass(cell, 'ui-state-highlight');
            }
        }
    };
    DataTable.prototype.onCellEditorKeydown = function (event, column, rowData) {
        if (this.editable) {
            this.onEdit.next({ originalEvent: event, column: column, data: rowData });
            //enter
            if (event.keyCode == 13) {
                this.switchCellToViewMode(event.target, column, rowData, true);
                this.preventBlurOnEdit = true;
            }
            //escape
            if (event.keyCode == 27) {
                this.switchCellToViewMode(event.target, column, rowData, false);
                this.preventBlurOnEdit = true;
            }
        }
    };
    DataTable.prototype.findCell = function (element) {
        var cell = element;
        while (cell.tagName != 'TD') {
            cell = cell.parentElement;
        }
        return cell;
    };
    DataTable.prototype.initResizableColumns = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).puicolresize({
            mode: this.columnResizeMode,
            colResize: function (event, ui) {
                _this.onColResize.next(ui.element);
            }
        });
    };
    DataTable.prototype.initColumnReordering = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).puicolreorder({
            colReorder: function (event, ui) {
                //right
                if (ui.dropSide > 0) {
                    _this.columns.splice(ui.dropIndex + 1, 0, _this.columns.splice(ui.dragIndex, 1)[0]);
                }
                else {
                    _this.columns.splice(ui.dropIndex, 0, _this.columns.splice(ui.dragIndex, 1)[0]);
                }
                _this.onColReorder.next({
                    dragIndex: ui.dragIndex,
                    dropIndex: ui.dropIndex,
                    columns: _this.columns
                });
            }
        });
    };
    DataTable.prototype.initScrolling = function () {
        jQuery(this.el.nativeElement.children[0]).puitablescroll({
            scrollHeight: this.scrollHeight,
            scrollWidth: this.scrollWidth
        });
    };
    DataTable.prototype.hasFooter = function () {
        if (this.footerRows) {
            return true;
        }
        else {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    DataTable.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            multiSortMeta: this.multiSortMeta
        };
    };
    DataTable.prototype.ngOnDestroy = function () {
        if (this.resizableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolresize('destroy');
        }
        if (this.reorderableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolreorder('destroy');
        }
        //remove event listener
        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowDblclick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "headerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "globalFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "sortOrder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "multiSortMeta", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(footer_1.Footer), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footer", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'p-dataTable',
            template: "\n        <div [attr.style]=\"style\" [attr.class]=\"styleClass\" [ngClass]=\"{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive}\">\n            <div class=\"ui-datatable-header ui-widget-header\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datatable-tablewrapper\" *ngIf=\"!scrollable\">\n                <table>\n                    <thead>\n                        <tr *ngIf=\"!headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"#col of columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col)}\">\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                        <tr *ngFor=\"#headerRow of headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"#col of headerRow.columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\" [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col)}\">\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tfoot *ngIf=\"hasFooter()\">\n                        <tr *ngIf=\"!footerRows\">\n                            <th *ngFor=\"#col of columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\" [ngClass]=\"{'ui-state-default':true}\">{{col.footer}}</th>\n                        </tr>\n                        <tr *ngFor=\"#footerRow of footerRows\">\n                            <th *ngFor=\"#col of footerRow.columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\" \n                                [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                                [ngClass]=\"{'ui-state-default':true}\">{{col.footer}}</th>\n                        </tr>\n                    </tfoot>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <tr #rowElement *ngFor=\"#rowData of dataToRender;#even = even; #odd = odd;\" class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                (click)=\"onRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" \n                                [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                            <td *ngFor=\"#col of columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\" \n                                [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"!col.template\">{{resolveFieldData(rowData,col.field)}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"col.template\">\n                                    <p-columnTemplateLoader [column]=\"col\" [rowData]=\"rowData\"></p-columnTemplateLoader>\n                                </span>\n                                <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\" \n                                        (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData)\"/>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div class=\"ui-widget-header ui-datatable-scrollable-header\" *ngIf=\"scrollable\">\n                <div class=\"ui-datatable-scrollable-header-box\">\n                    <table>\n                        <thead>\n                            <tr>\n                                <th #headerCell *ngFor=\"#col of columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\"\n                                    (click)=\"sort(col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                    [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': col.field === sortField}\">\n                                    <span class=\"ui-column-title\">{{col.header}}</span>\n                                    <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                         [ngClass]=\"{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}\"></span>\n                                    <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                </th>\n                            </tr>\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <div class=\"ui-datatable-scrollable-body\" *ngIf=\"scrollable\">\n                <table>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <tr #rowElement *ngFor=\"#rowData of dataToRender;#even = even; #odd = odd;\" class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                (click)=\"onRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" \n                                [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                            <td *ngFor=\"#col of columns\" [attr.style]=\"col.style\" [attr.class]=\"col.styleClass\" [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                <span class=\"ui-cell-data\">{{rowData[col.field]}}</span>\n                                <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\" \n                                        (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event,col,rowData)\"/>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\"\n                (onPageChange)=\"paginate($event)\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datatable-footer ui-widget-header\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator, inputtext_1.InputText, columntemplateloader_1.ColumnTemplateLoader],
            providers: [domhandler_1.DomHandler]
        }),
        __param(3, core_1.Query(column_1.Column)), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.QueryList, core_1.Renderer])
    ], DataTable);
    return DataTable;
})();
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.js.map