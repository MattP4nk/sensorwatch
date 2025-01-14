import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { CommsDto } from '../Dtos/Dtos';
import { CommunicationsService } from './communications.service';

@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {
  constructor(
    private commService: CommunicationsService,
    private storage: LocalStorageService,
    private router: Router
  ) { }
  requestValidation: CommsDto = {
    area: 'users',
    command: 'validate'
  };
  keyIsValid!: Boolean;
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    await this.commService.commsManager(this.requestValidation).subscribe((data) => {
      if (data.pack != "Valid") {
        this.storage.remove("key");
        this.keyIsValid = false;
      } else {
        this.keyIsValid = true;
      }
      // Primer escenario - Estoy en Login pero con un key VALIDO = Vamos a dashboard.
      if (this.keyIsValid) {
        this.router.navigateByUrl("dashboard");
      }
      // Segundo escenario - No estoy en login con un key NO VALIDO = vamos a login.
      if (!this.keyIsValid) {
        this.router.navigateByUrl("login");
      }
    })
    
    return true;
  }
}