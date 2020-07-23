import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { ReportsComponent } from '../pages/reports/reports.component';
import { EmployeesComponent } from '../pages/employees/employees.component';
import { EmployeeComponent } from '../pages/employee/employee.component';
import { TableComponent, NgbdSortableHeader } from '../pages/ngtable/ngtable.component';
import { TableService } from '../pages/ngtable/ngtable.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProfileComponent } from '../pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reportes',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Reportes' }
      ]
    },
    component: ReportsComponent
  },
  {
    path: 'colaboradores',
    data: {
      title: 'Colaboradores',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Colaboradores' }
      ]
    },
    component: TableComponent
  },
  {
    path: 'perfil',
    data: {
      title: 'Mi Perfil',
      urls: [
        { title: 'Perfil', url: '/dashboard' },
        { title: 'Mi Perfil' }
      ]
    },
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [
    StarterComponent,
    NgbdSortableHeader,
    TableComponent,
    ProfileComponent
  ],
  providers:[TableService]
})
export class StarterModule {}
