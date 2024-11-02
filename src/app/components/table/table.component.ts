import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableDataService } from './services/table-data.service';
import { TableHeaderComponent } from './table-header.component';
import { TableRowComponent } from './table-rows.component';
import { ITableColConfig } from './table.types';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngx-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  providers: [TableDataService],
  imports: [TableHeaderComponent, TableRowComponent],
})
export class TableComponent
  implements OnChanges, AfterViewInit, OnInit, OnDestroy
{
  private _destroy$ = new Subject<void>();

  @Input({ required: true }) data!: any[];
  @Input({ required: true }) colConfig!: ITableColConfig[];
  private _ngZone = inject(NgZone);

  @ViewChild('rowContainer')
  rowContainer!: ElementRef<HTMLElement>;

  _tableDataService = inject(TableDataService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.colConfig.currentValue) {
      this._tableDataService.setColConfig(changes.colConfig.currentValue);
    }
    if (changes.data.currentValue) {
      this._tableDataService.setTableData(changes.data.currentValue);
    }
  }

  updateColWidth() {
    const containerElem = this.rowContainer?.nativeElement;
    if (!containerElem) {
      return;
    }
    const { width } = containerElem.getBoundingClientRect();
    this._tableDataService.setColWidths(width);
  }

  ngAfterViewInit(): void {
    this.updateColWidth();
  }

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(10), takeUntil(this._destroy$))
        .subscribe(() => this._ngZone.run(() => this.updateColWidth()));
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
