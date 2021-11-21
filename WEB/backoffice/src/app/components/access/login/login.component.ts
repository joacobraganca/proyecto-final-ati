import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../access.component.sass', './login.component.sass'],
})
export class LoginComponent implements OnInit {
  @Input() isLogin: boolean = true;
  @Output() isLoginChange = new EventEmitter<boolean>();

  loginForm: FormGroup;
  errMsg: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      document: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  doLogin() {
    const { document, password } = this.loginForm.value;

    this.userService.login(document, password).subscribe(
      (response) => {
        this.userService.setUser(response.body);
        if (this.userService.getRole() === true) {
          const token = response.headers.get('Authorization') || '';
          // localStorage.setItem('access_token', token);
          localStorage.setItem('access_token', token);
          this.redirect();
        } else {
          this.error('Su usuario no contiene los permisos necesarios');
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

  error(err: any) {
    this._snackBar.open(err, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  goSignup() {
    this.isLoginChange.emit(false);
  }

  redirect() {
    // this.loading = true;
    this.router.navigate(['dashboard']);
  }
}
