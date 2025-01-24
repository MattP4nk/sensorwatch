import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommsDto } from '../Dtos/Dtos';
import { PlantModel, Records } from '../models/Models';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { CommunicationsService } from '../services/communications.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, SideMenuComponent, ProfilePageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  plantForm: FormGroup;
  sensorForm: FormGroup;
  passwordForm: FormGroup;
  constructor(
    private commService: CommunicationsService,
    private Storage: LocalStorageService,
    private route: Router) {
    this.plantForm = new FormGroup({
      name: new FormControl(),
      country: new FormControl()
    });
    this.sensorForm = new FormGroup({
      type: new FormControl(),
      plant_id: new FormControl()
    });
    this.passwordForm = new FormGroup({
      username: new FormControl(),
      oldPassword: new FormControl(),
      newPassword: new FormControl()
    });
    
  }

  plants: Array<PlantModel> = [];
  records: Records = new Records();
  totalSafes: number = 0;
  totalWarnings: number = 0;
  totalRedAlerts: number = 0;
  username: string | null = this.Storage.get("user")
  role: string | null = this.Storage.get("role")
  isAdmin: boolean = (this.role?.toString() == "ADMIN")

  plantName: string = "";
  country: string = "";
  plantId!: number;
  creatingPlant: boolean = false;
  creatingSensor: boolean = false;
  profilePage: boolean = false;
  passwordChange: boolean = false;
  display: string = "block"

  plantsRequest: CommsDto = {
    area: 'plants_sensors',
    command: 'getPlants'
  };
  historicsRequest: CommsDto = {
    area: 'plants_sensors',
    command: 'getAllHistoricsByType'
  };
  requestNewPlant: CommsDto = {
    area: 'plants_sensors',
    command: 'createPlant'
  }
  requestNewSensor: CommsDto = {
    area: 'plants_sensors',
    command: 'addSensor'
  }
  requestReadings: CommsDto = {
    area: 'plants_sensors',
    command: "updateAllValues",
    target: "all"
  }
  changeRequest: CommsDto = {
    area: 'users',
    command: 'passwordChange'
  };

  async ngOnInit() {
    this.getPlants(this.plantsRequest);
    this.getHistorics(this.historicsRequest);
  }

  async getPlants(request: CommsDto) {
    await this.commService.commsManager(request).subscribe((data) => {
      for (let item of data.pack) {
        let plant: PlantModel = item;
        this.totalSafes += plant.totalSafes;
        this.totalWarnings += plant.totalWarnings;
        this.totalRedAlerts += plant.totalRedAlerts;
        this.plants.push(plant);
      }
    });
  }

  openProfilePage() { 
    this.profilePage = true;
  }

  closeProfilePage() { 
    this.profilePage = false;
  }

  openPlantCreator() {
    this.creatingPlant = true;
  }
  closePlantCreator() {
    this.creatingPlant = false;
  }

  openSensorCreator(plant: PlantModel) {
    this.creatingSensor = true;
    this.plantName = plant.name;
    this.country = plant.country;
    this.plantId = plant.id;
  }
  closeSensorCreator() {
    this.creatingSensor = false;
  }

  async changePassword(){
    console.log(this.passwordForm.value)
    this.changeRequest.newCredentials = this.passwordForm.value
    await this.commService.commsManager(this.changeRequest).subscribe((data) => {
      let output: HTMLParagraphElement = document.createElement('p');
      output.setAttribute(
        'style',
        'background: #FFF; color:	darkseagreen; width: 95%; margin-bot: 10px; border-style: solid; border-radius: 1rem; padding: 5px;'
      );
      var content = document.createTextNode('');
      output.appendChild(content);
      content.nodeValue = data.status;
      document.getElementById("response_area")!.appendChild(output)
    })
  }

  openChangePassword(){
    this.passwordChange = true
  }

  cancelChangePassword(){
    this.passwordChange = false;
  }

  async createSensor() {
    this.requestNewSensor.sensor = this.sensorForm.value
    this.requestNewSensor.sensor!.plantId = this.plantId;
    await this.commService.commsManager(this.requestNewSensor).subscribe((data) => {
      let output: HTMLParagraphElement = document.createElement('p');
      output.setAttribute(
        'style',
        'background: #FFF; color:	darkseagreen; width: 95%; margin-bot: 10px; border-style: solid; border-radius: 1rem; padding: 5px;'
      );
      var content = document.createTextNode('');
      output.appendChild(content);
      content.nodeValue = data.status;
      document.getElementById("response_area")!.appendChild(output)
      if (data.status == "OK") {
        window.location.reload();
      }

    });
  }

  async createPlant() {
    this.requestNewPlant.plant = this.plantForm.value
    await this.commService.commsManager(this.requestNewPlant).subscribe((data) => {
      let output: HTMLParagraphElement = document.createElement('p');
      output.setAttribute(
        'style',
        'background: #FFF; color:	darkseagreen; width: 95%; margin-bot: 10px; border-style: solid; border-radius: 1rem; padding: 5px;'
      );
      var content = document.createTextNode('');
      output.appendChild(content);
      content.nodeValue = data.status;
      document.getElementById("response_area")!.appendChild(output)
      if (data.status == "OK") {
        window.location.reload();
      }

    });
  }

  async getReadings() {
    await this.commService.commsManager(this.requestReadings).subscribe((data) => {
      if (data.status == "OK") {
        window.location.reload();
      } else {
        this.route.navigate(['login']);
      }
    })
  }

  async getHistorics(request: CommsDto) {
    await this.commService.commsManager(request).subscribe((data) => {
      for (let historic of data.pack) {
        this.records.updateRecords(historic);
      }
    });
  }
}
