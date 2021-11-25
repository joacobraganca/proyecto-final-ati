import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PatientService } from 'src/app/services/patient.service';
import { MiscService } from 'src/app/services/misc.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private patientService: PatientService) {}


  ngOnInit(): void {}

  logout() {
    this.patientService.setPatients([]);
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
}
