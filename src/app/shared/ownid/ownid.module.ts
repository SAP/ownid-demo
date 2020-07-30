import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnidComponent } from './ownid.component';

@NgModule({
  declarations: [OwnidComponent],
  exports: [OwnidComponent],
  imports: [CommonModule],
})
export class OwnidModule {}
