import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstantLoginComponent } from './instant-login.component';

const routes: Routes = [
  {
    path: '',
    component: InstantLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstantLoginRoutingModule {}
