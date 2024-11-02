import { Injectable, OnDestroy, signal } from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import {
  ITableColCell,
  ITableColConfig,
  ITableHeader,
  ITableInternalKeys,
  ITableRow,
} from '../table.types';

@Injectable()
export class TableDataService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _colConfig!: ITableColConfig[];
  private _data!: any[];

  private _tableRowsSubject = new ReplaySubject<ITableRow[]>(1);
  private _tableHaderSubject = new ReplaySubject<ITableHeader[]>(1);

  colWidthSignal = signal<{ [key: string]: number } | null>({});

  tableRows$ = this._tableRowsSubject
    .asObservable()
    .pipe(takeUntil(this._destroy$));

  tableHeader$ = this._tableHaderSubject
    .asObservable()
    .pipe(takeUntil(this._destroy$));

  setColConfig(colConfig: ITableColConfig[]) {
    this._colConfig = [...colConfig];
    const idConfig = this.getTableRowIdConfig();
    if (!idConfig) {
      const idColConfig: ITableColConfig = {
        field: ITableInternalKeys.ID,
        cellValueFn: (row: any, index) => index,
        width: 32,
      };
      this._colConfig.push(idColConfig);
    } else if (!idConfig.width) {
      idConfig.width = 32;
    }
  }

  setColWidths(totalWidth: number) {
    if (this._colConfig) {
      const colWithPredefinedWidth = this._colConfig.filter(
        (item) => !!item.width
      );
      const totalConfigWidth = colWithPredefinedWidth.reduce(
        (acc, curr) => acc + curr.width!,
        0
      );
      const remainingWidth = totalWidth - totalConfigWidth;
      const colWidth =
        remainingWidth /
          (this._colConfig.length - colWithPredefinedWidth.length) -
        this._colConfig.length;
      const widthMap: { [key: string]: number } = {};
      this._colConfig.forEach(
        (item) => (widthMap[item.field] = item.width ?? colWidth)
      );
      this.colWidthSignal.update(() => widthMap);
    }
  }

  setTableData(data: any[]) {
    this._data = data;
    this.init();
  }

  init() {
    if (this._colConfig?.length) {
      this.makeTableHeaders();
      this.makeTableRows();
    }
  }

  private getTableRowIdConfig() {
    return this._colConfig.find((item) => item.field === ITableInternalKeys.ID);
  }

  protected makeTableHeaders() {
    const tableHeaders: ITableHeader[] = [];

    for (let i = 0; i < this._colConfig.length; i++) {
      const config = this._colConfig[i];
      const header: ITableHeader = {
        key: config.field,
        headerLabel: config.headerLabel,
        headerTooltip: config.headerTooltip || '',
      };
      tableHeaders.push(header);
    }
    this._tableHaderSubject.next(tableHeaders);
  }

  protected makeTableRows() {
    const tableRows: ITableRow[] = [];
    const tableRowIdConfig = this.getTableRowIdConfig();
    for (let i = 0; i < this._data.length; i++) {
      const contextData = this._data[i];
      const idValue =
        tableRowIdConfig?.cellValueFn &&
        tableRowIdConfig.cellValueFn(contextData, i);

      const row: ITableRow = {
        [ITableInternalKeys.ID]: idValue,
        [ITableInternalKeys.SELECTED]: false,
        [ITableInternalKeys.EVEN]: i % 2 === 0,
        [ITableInternalKeys.DISABLED]: false,
        colCells: [] as any[],
        trackById: `${idValue}_row_${i}`,
      };
      for (let j = 0; j < this._colConfig.length; j++) {
        const key = this._colConfig[j].field;
        const cell: ITableColCell = {
          key,
          label: this._data[i][key] as string,
          contextData,
          trackById: `${idValue}_col_${j}`,
        };
        row.colCells.push(cell);
      }
      tableRows.push(row);
    }
    this._tableRowsSubject.next(tableRows);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
