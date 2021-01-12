import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page.component';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';
import { GigyaService } from '../../services/gigya.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomeRoutingModule, DemoFooterModule, DemoHeaderModule],
  providers: [GigyaService],
})
export class HomeModule {}
