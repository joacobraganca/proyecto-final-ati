import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.sass'],
})
export class AccessComponent implements OnInit {
  isLogin = true;

  constructor() {}

  ngOnInit(): void {}
}
