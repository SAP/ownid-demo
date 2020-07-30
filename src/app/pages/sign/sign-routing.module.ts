import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignPageComponent } from './sign-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignRoutingModule {}
