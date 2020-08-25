import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesGuard } from './services/notes-guard.service';
import { LoginGuard } from './services/login-guard.service';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'instant-login',
    loadChildren: () => import('./pages/instant-login/instant-login.module').then((m) => m.InstantLoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registration/registration.module').then((m) => m.RegistrationModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'instant-register',
    loadChildren: () => import('./pages/instant-registration/instant-registration.module').then((m) => m.InstantRegistrationModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then((m) => m.NotesModule),
    canActivate: [NotesGuard],
  },
  {
    path: 'passwordless',
    loadChildren: () => import('./pages/passwordless/passwordless.module').then((m) => m.PasswordlessModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
