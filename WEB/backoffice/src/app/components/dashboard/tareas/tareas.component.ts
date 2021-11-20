import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['../dashboard.component.sass', './tareas.component.sass'],
})
export class TareasComponent implements OnInit, OnDestroy {
  constructor(
    private taskService: TaskService,
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
    'fechaDeAdmision',
    'estado',
    'usuarioAsignado',
  ];
  tareas: Tarea[] = [];

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
          this.tareas = response.body || [];
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
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
}
