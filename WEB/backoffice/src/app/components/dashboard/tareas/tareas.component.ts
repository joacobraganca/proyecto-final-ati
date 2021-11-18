import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['../dashboard.component.sass', './tareas.component.sass'],
})
export class TareasComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'actions'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {}
}
