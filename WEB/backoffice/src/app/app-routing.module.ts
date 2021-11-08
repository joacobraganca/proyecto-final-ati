import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/access/login/login.component';
import { AccessComponent } from './components/access/access.component';

const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: 'access', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
