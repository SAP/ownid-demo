import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GigyaService } from './services/gigya.service';
import { NotesGuard } from './services/notes-guard.service';
import { LoginGuard } from './services/login-guard.service';
import { AppStore } from './app.store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [GigyaService, NotesGuard, LoginGuard, AppStore],
  bootstrap: [AppComponent]
})
export class AppModule {}
