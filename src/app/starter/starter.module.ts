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
import { AuthGuard } from '../authentication/guards/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ReportCardComponent } from '../pages/reports/report-card/report-card.component';
import { QuarterResultComponent } from '../pages/reports/report-card/quarter-result/quarter-result.component';

const routes: Routes = [
  {
    path: 'reportes',
    data: {
      title: 'Reportes',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Reportes' }
      ]
    },
   // canActivate:[AuthGuard],
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
    path: 'colaboradores/:id',
    data: {
      title: 'Colaborador',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Colaboradores' }
      ]
    },
    component: ReportsComponent
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
  },
  {
    path:'notFound',component:NotFoundComponent
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
    ProfileComponent,
    ReportsComponent,
    ReportCardComponent,
    QuarterResultComponent,
  ],
  providers:[TableService]
})
export class StarterModule {}
