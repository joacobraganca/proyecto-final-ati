import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { UserService } from '../../services/user.service';

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
  healthHouses = ['Residencial 1', 'Residencial 2'];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router // private userService: UserService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      document: ['', Validators.required],
      healthHouse: [Validators.required],
      isAdmin: [false],
    });
  }

  ngOnInit(): void {}

  doSignup() {
    const { name, password, repeatPassword, document, healthHouse, isAdmin } =
      this.signupForm.value;

    if (password.length < 8) {
      this.error('Las contraseñas deben tener 8 o más caracteres.');
    } else if (password !== repeatPassword) {
      this.error('Las contraseñas no coinciden.');
    } else {
      // this.userService.login(user, password).subscribe(
      //   (user) => {
      //     this.userService.setUser(user);
      //     this.redirect();
      //   },
      //   ({ error: { mensaje } }) => {
      //     this.error(mensaje);
      //   }
      // );
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
