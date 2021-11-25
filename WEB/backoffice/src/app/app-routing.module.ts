import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './components/access/access.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoggedGuard } from './guards/auth-logged.guard';
const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
  },
  {
    path: '**',
    component: AccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
