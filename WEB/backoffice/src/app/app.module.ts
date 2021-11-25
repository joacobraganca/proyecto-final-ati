import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

// Componentes
import { SharedModule } from './components/shared/shared.module';
import { LoginComponent } from './components/access/login/login.component';
import { SignupComponent } from './components/access/signup/signup.component';
import { AccessComponent } from './components/access/access.component';
import { DialogComponent } from './components/utils/dialog/dialog.component';

import { DataService } from './services/data.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccessComponent,
    SignupComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
