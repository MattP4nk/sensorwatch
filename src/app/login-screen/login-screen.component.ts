import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommsDto } from '../Dtos/Dtos';
import { CommunicationsService } from '../services/communications.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [CommunicationsService, LocalStorageService],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css',
})
export class LoginScreenComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  recoveryForm: FormGroup;

  constructor(
    private Comms: CommunicationsService,
    private Storage: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    this.registerForm = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });
    this.recoveryForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
    });
  }
  loginRequest: CommsDto = {
    area: 'users',
    command: 'login',
  };
  registerRequest: CommsDto = {
    area: 'users',
    command: 'register',
  };
  recoveryRequest: CommsDto = {
    area: 'users',
    command: 'recovery',
  };

  displayRegister = false;
  displayRecovery = false;
  displayGray = false;
  displaySuccess = false;
  displayFailure = false;
  message = '';

  async login() {
    this.loginRequest.credentials = this.loginForm.value;
    await this.Comms.commsManager(this.loginRequest).subscribe((data) => {
      if (data.token != undefined) {
        this.Storage.set('user', data.pack.username);
        this.Storage.set('role', data.pack.role);
        this.Storage.set('key', data.token);
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  closeAlert() {
    this.message = '';
    this.displayGray = false;
    this.displaySuccess = false;
    this.displayFailure = false;
  }

  openRecoveryForm() {
    this.displayRecovery = true;
    this.displayGray = true;
  }
  closeRecoveryForm() {
    this.recoveryForm.reset();
    this.displayRecovery = false;
    this.displayGray = false;
  }
  async recovery() {
    this.recoveryRequest.recoveryDTO = this.recoveryForm.value;
    await this.Comms.commsManager(this.recoveryRequest).subscribe((data) => {
      console.log('Recovery method');
      console.log(data);
      if (data.status == 'OK') {
        this.message = 'Recovery started! Check your email!';
        this.displayRecovery = false;
        this.displayGray = true;
        this.displaySuccess = true;
      } else {
        this.message = data.status;
        this.displayRecovery = false;
        this.displayGray = true;
        this.displayFailure = true;
      }
    });
  }

  openRegisterForm() {
    this.displayRegister = true;
    this.displayGray = true;
  }
  closeRegisterForm() {
    this.registerForm.reset();
    this.displayRegister = false;
    this.displayGray = false;
  }
  async register() {
    this.registerRequest.regInfo = this.registerForm.value;
    console.log(this.registerForm.value);
    await this.Comms.commsManager(this.registerRequest).subscribe((data) => {
      if (data.status == 'OK') {
        this.message = 'Register success!';
        this.displayRegister = false;
        this.displayGray = true;
        this.displaySuccess = true;
      } else {
        this.message = data.status;
        this.displayRegister = false;
        this.displayGray = true;
        this.displayFailure = true;
      }
    });
  }
}
