import { Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardService } from './services/login-guard.service';

export const routes: Routes = [
    {path: "login", title: "Login", component: LoginScreenComponent, canActivate:[LoginGuardService]},
    {path: 'dashboard', title: "Dashboard", component: DashboardComponent, canActivate:[LoginGuardService]},
    {path: '', pathMatch: "full", redirectTo: "login"},
    {path: "**", pathMatch: "full", redirectTo: "dashboard"}
];
