import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes
import { SharedModule } from './components/shared/shared.module';
import { LoginComponent } from './components/access/login/login.component';
import { AccessComponent } from './components/access/access.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
