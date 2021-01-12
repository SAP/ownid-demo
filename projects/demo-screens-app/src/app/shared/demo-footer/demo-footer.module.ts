import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFooterComponent } from './demo-footer.component';

@NgModule({
  declarations: [DemoFooterComponent],
  exports: [DemoFooterComponent],
  imports: [CommonModule],
})
export class DemoFooterModule {}
