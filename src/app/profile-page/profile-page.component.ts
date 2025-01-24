import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(
    private Storage: LocalStorageService,
  ){}
  username: string | null = this.Storage.get("user")
  role: string | null = this.Storage.get("role")

}
