import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HealthHome } from 'src/app/interfaces/healthHome';
import { UserService } from '../../../services/user.service';
import { HealthHomeService } from 'src/app/services/healthHome.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../access.component.sass', './signup.component.sass'],
})
export class SignupComponent implements OnInit {
  @Input() isLogin: boolean = false;
  @Output() isLoginChange = new EventEmitter<boolean>();

  isAdministrator = false;
  signupForm: FormGroup;
  errMsg: any;
  loading = false;
  healthHomes: HealthHome[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private healthHomeService: HealthHomeService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      document: ['', Validators.required],
      healthHome: [],
      isAdmin: [false],
    });
  }

  ngOnInit(): void {
    this.healthHomeService.getHealthHomes().subscribe((response) => {
      this.healthHomes = response;
    });
  }

  doSignup() {
    const { name, password, repeatPassword, document, healthHome, isAdmin } =
      this.signupForm.value;

    if (password.length < 8) {
      this.error('Las contraseñas deben tener 8 o más caracteres.');
    } else if (password !== repeatPassword) {
      this.error('Las contraseñas no coinciden.');
    } else {
      this.userService
        .signup(name, password, document, healthHome._id, isAdmin)
        .subscribe(
          (response) => {
            if (isAdmin) {
              this.userService.setUser(response.body);
              localStorage.setItem(
                'access_token',
                response.headers.get('Authorization') || ''
              );
              this.redirect();
            } else {
              this.error('Enfermero registrado con éxito');
            }

          },
          (error) => {
            if (error.status >= 400 && error.status < 500) {
              this.error('Verifique documento y/o contraseña');
            } else {
              this.error('Ocurrió un error inesperado');
            }
          }
        );
    }
  }

  error(err: any) {
    this._snackBar.open(err, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  goLogin() {
    this.isLoginChange.emit(true);
  }

  redirect() {
    this.loading = true;
    this.router.navigate(['dashboard']);
  }
}
