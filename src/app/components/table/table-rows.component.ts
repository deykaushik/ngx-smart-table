import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableDataService } from './services/table-data.service';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ITableInternalKeys } from './table.types';

@Component({
  selector: 'ngx-table-rows',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-rows.component.html',
  imports: [AsyncPipe, NgStyle, NgClass],
})
export class TableRowComponent {
  ITableInternalKeys = ITableInternalKeys;
  _tableDataService = inject(TableDataService);

  protected tableRows$ = this._tableDataService.tableRows$;
  protected colWidthSignal = this._tableDataService.colWidthSignal;

  getColWidth(field: string) {
    const width = this.colWidthSignal()![field];
    return `${width}px`;
  }
}
