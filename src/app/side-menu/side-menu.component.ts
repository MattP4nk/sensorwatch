import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';

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
  visible: boolean = false;

  ngOnInit(): void {
    this.isVisible();
  }

  isVisible() {
    if (this.storage.get("key") != null){
      this.visible = true;
    }
  }

  logOff() {
    this.storage.remove("role");
    this.storage.remove("key");
    this.storage.remove("user");
  }

}
