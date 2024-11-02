import { Injectable } from '@angular/core';
import { debounceTime, delay, map, of, tap } from 'rxjs';
import { EmployeeData } from './table-data';

@Injectable({
  providedIn: 'root',
})
export class TableDataApiService {
  getAllEmployee() {
    return of(null).pipe(
      delay(1000),
      map(() => ({ data: EmployeeData, totalRecords: EmployeeData.length }))
    );
  }
}
