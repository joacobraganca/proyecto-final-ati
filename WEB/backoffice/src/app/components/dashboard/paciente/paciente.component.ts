import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { PatientService } from 'src/app/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['../dashboard.component.sass', './paciente.component.sass'],
})
export class PacienteComponent implements OnInit, OnDestroy {
  constructor(
    private patientService: PatientService,
    public dialog: MatDialog,
    private userService: UserService,
    private data: DataService
  ) {}

  subscription: Subscription = new Subscription();
  mode: string = '';
  title: string = '';
  text: string = '';
  displayedColumns: string[] = [
    'nombre',
    'documento',
    'medicoCabecera',
    'patologias',
    'contactos',
    'edit',
    'delete',
  ];
  pacientes: Paciente[] = [];

  ngOnInit(): void {
    this.getPatients();
    this.subscription = this.data.currentMode.subscribe(
      (mode) => (this.mode = mode)
    );
    this.subscription = this.data.currentTitle.subscribe(
      (title) => (this.title = title)
    );
    this.subscription = this.data.currentText.subscribe(
      (text) => (this.text = text)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // Obtener pacientes por id de casa de salud
  getPatients() {
    this.pacientes = [];
    this.patientService
      .getPatientsByHome(this.userService.getHealthHome())
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.pacientes = response.body || [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Crear paciente
  createPatient() {
    const dialogRef = this.dialog.open(CrearPacienteComponent, {
      height: '80%',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Eliminar paciente
  deletePatient(id: string) {
    this.patientService
      .deletePatientById(id)
      .subscribe((response: Response) => {
        if (response.status === 200) {
          this.data.changeDialog(
            'show',
            'Éxito',
            'Se elimino al paciente satisfactoriamente.'
          );
          const dialogRef = this.dialog.open(DialogComponent);
          this.ngOnInit();
        }
      });
  }
}
