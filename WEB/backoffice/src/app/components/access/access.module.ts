import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { AccessRoutingModule } from './access-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AccessRoutingModule, SharedModule],
})
export class DashboardModule {}
