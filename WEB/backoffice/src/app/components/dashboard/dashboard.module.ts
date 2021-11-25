import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { PacienteComponent } from './paciente/paciente.component';
import { DashboardComponent } from './dashboard.component';
import { TareasComponent } from './tareas/tareas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearPacienteComponent } from './paciente/crear-paciente/crear-paciente.component';
import { CrearTareaComponent } from './tareas/crear-tarea/crear-tarea.component';

@NgModule({
  declarations: [
    PacienteComponent,
    DashboardComponent,
    TareasComponent,
    NavbarComponent,
    CrearPacienteComponent,
    CrearTareaComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
