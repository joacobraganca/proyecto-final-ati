import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.sass'],
})
export class CrearTareaComponent implements OnInit {
  public disabled = false;
  public showSpinners = true;

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
  });
  public dateControl = new FormControl(new Date());

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
