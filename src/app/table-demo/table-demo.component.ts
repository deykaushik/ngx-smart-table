import { Component, inject, OnInit } from '@angular/core';
import { TableDataApiService } from '../table-data/table-data.service';
import { AsyncPipe } from '@angular/common';
import {
  ITableColConfig,
  ITableInternalKeys,
} from '../components/table/table.types';
import { TableComponent } from '../components/table/table.component';
import { IEmployee } from '../table-data/table-data';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [AsyncPipe, TableComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent {
  private _tableDataApi = inject(TableDataApiService);

  getAllEmployees$ = this._tableDataApi.getAllEmployee();

  colConfig: ITableColConfig[] = [
    { field: ITableInternalKeys.ID, cellValueFn: (row: IEmployee) => row.id },
    { field: 'name', headerLabel: 'Name', headerTooltip: 'Name' },
    { field: 'position', headerLabel: 'Position', headerTooltip: 'Position' },
    { field: 'team', headerLabel: 'Team', headerTooltip: 'Team' },
    {
      field: 'office_location',
      headerLabel: 'Office Location',
      headerTooltip: 'Office Location',
    },
    {
      field: 'office_location_country',
      headerLabel: 'Office Location Country',
      headerTooltip: 'Office Location Country',
    },
  ];
}
