import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './authentication/guards/auth.guard';

export const Approutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: FullComponent,
    canActivate:[AuthGuard],
    children: [
      //{ path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      }
    ]
  },
  
  { path: 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  {
    path:'notFound',component:NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/notFound'
  }
];
