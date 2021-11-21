import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Status } from 'src/app/interfaces/enum/status';
import { UserService } from 'src/app/services/user.service';
import { PatientService } from 'src/app/services/patient.service';
import { TaskService } from 'src/app/services/task.service';
import { Misc } from 'src/app/interfaces/misc';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.sass'],
})
export class CrearTareaComponent implements OnInit {
  enumKeys = Object.keys(Status) as Array<keyof typeof Status>;
  statusList = Status;

  taskFormGroup: FormGroup;
  moment: any;
  priority: boolean = false;
  patientsList: Misc[] = [];
  nursesList: Misc[] = [];

  public date: moment.Moment | undefined;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment | undefined;
  public stepHour = 1;
  public stepMinute = 1;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private userService: UserService,
    private patientService: PatientService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public parentData: any
  ) {
    this.taskFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      statusTask: [],
      nurseSel: [undefined],
      patientSel: [],
      priority: [false],
    });
  }

  ngOnInit() {
    this.getPatients();
    this.getNurses();
  }

  getPatients() {
    this.patientService
      .getPatientsByHome(this.userService.getHealthHome())
      .subscribe(
        (response) => {
          if (response.status === 200) {
            if (response.body !== null) {
              let auxList: Misc[] = [];
              response.body.map((p) => {
                auxList.push({
                  _id: p._id,
                  name: p.name,
                });
              });
              this.patientsList = auxList;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getNurses() {
    this.userService
      .getNursesByHome(this.userService.getHealthHome())
      .subscribe(
        (response) => {
          if (response.status === 200) {
            if (response.body !== null) {
              let auxList: Misc[] = [];
              response.body.map((p) => {
                auxList.push({
                  _id: p._id,
                  name: p.name,
                });
              });
              this.nursesList = auxList;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveTask() {
    let formatDate = this.formatDate(this.taskFormGroup.get('date')?.value);

    let nurse = this.taskFormGroup.get('nurseSel')?.value;
    nurse === null ? (nurse = null) : (nurse = nurse._id);

    let patient = this.taskFormGroup.get('patientSel')?.value;
    patient === null ? (patient = null) : (patient = patient._id);

    this.statusList;
    let task = {
      name: this.taskFormGroup.get('title')?.value,
      description: this.taskFormGroup.get('description')?.value,
      dateTime: formatDate,
      status: this.taskFormGroup.get('statusTask')?.value,
      assignedUser: nurse,
      assignedPatient: patient,
      assignedHealthHome: this.userService.getHealthHome(),
      priority: this.taskFormGroup.get('priority')?.value,
    };

    this.taskService.createTask(task).subscribe(
      (response) => {
        this.parentData.closeDialog();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(d: Date) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + 'T' + [hour, minute].join(':');
  }
}
