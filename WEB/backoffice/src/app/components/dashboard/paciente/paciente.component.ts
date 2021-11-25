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
import { MiscService } from 'src/app/services/misc.service';

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
    private data: DataService,
    private miscService: MiscService
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
    'cuidados',
    'contactos',
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
    let patients = this.patientService.getPatientsLocal();
    let auxList: Paciente[] = [];
    patients.forEach((patient) => {
      let auxPatient = patient;
      auxPatient.mutualist =
        this.miscService.getHospitalsLocal().find((x) => x)?.name || '';
      auxPatient.emergencyService =
        this.miscService.getEmertencyServicesLocal().find((x) => x)?.name || '';
      auxPatient.partnerService =
        this.miscService.getPartnerServicesLocal().find((x) => x)?.name || '';

      let pathologies: string[] = [];
      auxPatient.pathologies.forEach((p) => {
        pathologies.push(
          this.miscService.getPathologiesLocal().filter((x) => x._id === p)[0]
            ?.name || ''
        );
      });
      auxPatient.pathologies = pathologies;
      auxList.push(auxPatient);
    });
    this.pacientes = auxList;
  }

  // Crear paciente
  createPatient() {
    const dialogRef = this.dialog.open(CrearPacienteComponent, {
      height: '80%',
      width: '700px',
      data: {
        closeDialog: () => {
          dialogRef.close();
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  closePatientDialog() {
    this.dialog.closeAll();
  }

  // Eliminar paciente
  deletePatient(id: string) {
    this.patientService
      .deletePatientById(id)
      .subscribe((response: Response) => {
        if (response.status === 200) {
          this.patientService
            .getPatientsByHome(this.userService.getHealthHome())
            .subscribe(
              (response) => {
                this.patientService.setPatients(response.body || []);
              },
              (error) => {
                this.patientService.setPatients([]);
                console.log(error);
              }
            )
            .add(() => {
              this.data.changeDialog(
                'show',
                'Éxito',
                'Se elimino al paciente satisfactoriamente.'
              );
              const dialogRef = this.dialog.open(DialogComponent);
              this.ngOnInit();
            });
        }
      });
  }
}
