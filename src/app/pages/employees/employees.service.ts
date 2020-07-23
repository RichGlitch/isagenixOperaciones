import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { employeesList } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  public employeesList: Employee[] = employeesList;

  public getTable() {
      return this.employeesList;
  }
}
