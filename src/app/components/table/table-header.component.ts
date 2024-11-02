import { AsyncPipe, JsonPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { TableDataService } from './services/table-data.service';
import { ITableInternalKeys } from './table.types';

@Component({
  selector: 'ngx-table-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-header.component.html',
  imports: [AsyncPipe, NgStyle],
  host: {
    class:
      'flex min-h-[32px] items-center border-solid border-b border-[#edf0f7]',
  },
})
export class TableHeaderComponent {
  ITableInternalKeys = ITableInternalKeys;
  _tableDataService = inject(TableDataService);
  _eleRef = inject(ElementRef);

  protected tableHeaders$ = this._tableDataService.tableHeader$;
  protected colWidthSignal = this._tableDataService.colWidthSignal;

  getColWidth(field: string) {
    const width = this.colWidthSignal()![field];
    return `${width}px`;
  }
}
