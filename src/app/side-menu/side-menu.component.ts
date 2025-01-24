import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
  }

  logOff() {
    this.storage.remove("role");
    this.storage.remove("key");
    this.storage.remove("user");
  }

}
