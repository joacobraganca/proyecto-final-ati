import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { MiscService } from 'src/app/services/misc.service';
import { PatientService } from 'src/app/services/patient.service';
import { Status } from 'src/app/interfaces/enum/status';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['../dashboard.component.sass', './tareas.component.sass'],
})
export class TareasComponent implements OnInit, OnDestroy {
  enumKeys = Object.keys(Status) as Array<keyof typeof Status>;
  statusList = Status;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private userService: UserService,
    private data: DataService,
    private miscService: MiscService,
    private patientService: PatientService
  ) {}

  subscription: Subscription = new Subscription();
  mode: string = '';
  title: string = '';
  text: string = '';
  displayedColumns: string[] = [
    'priority',
    'name',
    'description',
    'dateTime',
    'assignedPatient',
    'assignedUser',
    'status',
    'delete',
  ];
  tareas: Task[] = [];

  ngOnInit(): void {
    this.getTasks();
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
  // Obtener tareas por id de casa de salud
  getTasks() {
    this.tareas = [];
    this.taskService.getTaskByHome(this.userService.getHealthHome()).subscribe(
      (response) => {
        if (response.status === 200) {
          if (response.body !== null) {
            this.tareas = response.body;

            let auxList: Task[] = [];
            response.body.forEach((task) => {
              task.assignedUser =
                this.userService
                  .getNursesLocal()
                  .find((x) => x._id === task.assignedUser)?.name || '';
              task.assignedPatient =
                this.patientService
                  .getPatientsLocal()
                  .find((x) => x._id === task.assignedPatient)?.name || '';
              task.dateTime = this.formatDate(task.dateTime);
              auxList.push(task);
            });
            this.tareas = auxList;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Crear tarea
  createTask() {
    const dialogRef = this.dialog.open(CrearTareaComponent, {
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

  // Eliminar tarea
  deleteTask(id: string) {
    this.taskService.deleteTaskById(id).subscribe((response: Response) => {
      if (response.status === 200) {
        this.data.changeDialog(
          'show',
          'Éxito',
          'Se elimino la tarea satisfactoriamente.'
        );
        const dialogRef = this.dialog.open(DialogComponent);
        this.ngOnInit();
      }
    });
  }

  formatDate(date: string) {
    let d = new Date(date);
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return (
      [day, month, year].join('/') +
      ' ' +
      [hour, minute < 10 ? '0' + minute : minute].join(':')
    );
  }
}
