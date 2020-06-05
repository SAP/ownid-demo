import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UserGuardService } from '@services/user-guard.service';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
        import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
        import('./pages/notes/notes.module').then((m) => m.NotesModule),
    // canActivate: [UserGuardService],
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'login',
  // },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
