import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports/reports.component'
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'reports',
        data: {
          title: 'Reportes',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reportes' }
          ]
        },
        component: ReportsComponent
      },
      {
        path:'employees',
        data:{
          title: 'Empleados'
        },
        component: EmployeesComponent,
        
      },
      {
        path:'profile',
        data:{
          title: 'Mi Perfil'
        },
        component: ProfileComponent,
        
      },
    ]
    
  },
  
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ReportsComponent]
})


export class PagesModule { }
