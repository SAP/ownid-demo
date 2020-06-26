import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserGuardService } from "@services/user-guard.service";
import { GigyaService } from "@services/gigya.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GlobalErrorHandler } from "./infrastructure/global-error-handler";
import { AppStore } from "./app.store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    GigyaService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    AppStore,
    UserGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
