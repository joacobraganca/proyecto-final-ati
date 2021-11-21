import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/services/misc.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private miscSevice: MiscService,
    private patientService: PatientService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getHospitals();
    this.getPathologies();
    this.getPartnerService();
    this.getEmergencyService();
    this.getPatients();
    this.getNurses();
  }

  getHospitals() {
    this.miscSevice.getHospital().subscribe(
      (response) => {
        if (response.status === 200) {
          this.miscSevice.setHospitals(response.body || []);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPathologies() {
    this.miscSevice.getPathologies().subscribe(
      (response) => {
        if (response.status === 200) {
          this.miscSevice.setPathologies(response.body || []);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPartnerService() {
    this.miscSevice.getPartnerService().subscribe(
      (response) => {
        if (response.status === 200) {
          this.miscSevice.setPartnerServices(response.body || []);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmergencyService() {
    this.miscSevice.getEmergencyService().subscribe(
      (response) => {
        if (response.status === 200) {
          this.miscSevice.setEmertencyServices(response.body || []);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPatients() {
    this.patientService
      .getPatientsByHome(this.userService.getHealthHome())
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.patientService.setPatients(response.body || []);
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
            this.userService.setNurses(response.body || []);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
