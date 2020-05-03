import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuardService } from '@services/user-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/sign/sign-page.module').then((m) => m.SignPageModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/user/user-page.module').then((m) => m.UserPageModule),
    canActivate: [UserGuardService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
