import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoHeaderComponent } from './demo-header.component';

@NgModule({
  declarations: [DemoHeaderComponent],
  exports: [DemoHeaderComponent],
  imports: [CommonModule],
})
export class DemoHeaderModule {}
