import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstantRegistrationComponent } from './instant-registration.component';

const routes: Routes = [
  {
    path: '',
    component: InstantRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstantRegistrationRoutingModule {}
