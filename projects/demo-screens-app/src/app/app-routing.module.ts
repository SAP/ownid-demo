import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesGuard } from './services/notes-guard.service';
import { LoginGuard } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountModule),
    canActivate: [NotesGuard],
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
