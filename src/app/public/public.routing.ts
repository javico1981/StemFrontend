import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { NoAuthGuard } from 'app/shared/guards/no-auth-guard.guard';

export const publicRoutes: Routes =[
  {
    path: '',
    pathMatch : 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent
  },
  {
    path: 'registro',
    canActivate: [NoAuthGuard],
    component: RegistroComponent
  },
  {
    path: 'encuesta',
    component: EncuestaComponent
  }
];

