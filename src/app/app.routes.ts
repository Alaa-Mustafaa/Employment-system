import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
    {
        path: 'home',
        pathMatch: 'full',
        title: 'Employement System | Home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
       {
        path: 'showOneEmployee/:id',
        pathMatch: 'full',
        title: 'Employement System | Show One Employee',
        loadComponent: () => import('./components/show-one-employee/show-one-employee.component').then(m => m.ShowOneEmployeeComponent) 
      },
      {
        path: 'form/:role/:id',
        pathMatch: 'full',
        title: 'Employement System | Form ',
        loadComponent: () => import('./components/form-employee/form-employee.component').then(m => m.FormEmployeeComponent) 
      }  

];
