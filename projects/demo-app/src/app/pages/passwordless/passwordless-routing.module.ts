import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordlessComponent } from './passwordless.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordlessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordlessRoutingModule {}
