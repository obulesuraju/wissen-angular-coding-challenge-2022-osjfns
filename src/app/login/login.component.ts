import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginDetails: any = {
    email: null,
    password: null,
  };
  submitted = false;
  email: any;
  password: any;
  loggedin: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnDestroy() {}
  bodyContent: any = [];

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill email and password fields (correctly).');
    }
    const inputPayload: any = {
      email: this.email,
      password: this.password,
    };
    this.http
      .post(' https://reqres.in/api/login', inputPayload)
      .subscribe((res: any) => {
        console.log(res);
        this.loggedin = true;
        alert('Logged in successfully.');
        this.getTable(res.token);
      });
  }

  getTable(token) {
    const paylaod:any = {
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-type': 'application/json',
      }        
    };  
    const headersOptions = {
      headers: new Headers(paylaod.headers)
    };
    this.http.get('https://reqres.in/api/unknown').subscribe((res: any) => {
      console.log(res);
      this.bodyContent = res.data;
    });
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    return false;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    return false;
  }
}
