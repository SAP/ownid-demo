import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AppStore } from '../../app.store';
import { ClickOutsideModule } from '../../shared/click-outside/click-outside.module';
import { AccountPopupComponent } from './account-popup/account-popup.component';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { GigyaService } from '../../services/gigya.service';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [AccountComponent, AccountPopupComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    OwnidModule,
    DemoFooterModule,
    DemoHeaderModule,
  ],
  providers: [AppStore, GigyaService],
})
export class AccountModule {}
