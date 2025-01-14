import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CommunicationsService } from './services/communications.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginGuardService } from './services/login-guard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, ReactiveFormsModule, SideMenuComponent],
  providers: [CommunicationsService, LocalStorageService, LoginGuardService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sensorwatch';
}
