export class PlantModel{
    id!: number;
    name!: string;
    country!: string;
    sensorsList!: Array<SensorModel>;
    totalSafes!: number;
    totalWarnings!: number;
    totalRedAlerts!: number;
    totalDisabled!: number;
}

export class SensorModel{
    name!: string;
    type!: string;
    value!: string;
    plantId!: number;
    totalSafes: number = 0;
    totalWarnings: number = 0;
    totalRedAlerts: number = 0;
}

export class UserModel{
    email!: string;
    username!: string;
    role!: string;
}

export class Records{
    temperatureSafes: number = 0;
    temperatureWarnings: number = 0;
    temperatureRedAlerts: number = 0;
    presionSafes: number = 0;
    presionWarnings: number = 0;
    presionRedAlerts: number = 0;
    vientoSafes: number = 0;
    vientoWarnings: number = 0;
    vientoRedAlerts: number = 0;
    nivelesSafes: number = 0;
    nivelesWarnings: number = 0;
    nivelesRedAlerts: number = 0;
    energiaSafes: number = 0;
    energiaWarnings: number = 0;
    energiaRedAlerts: number = 0;
    tensionSafes: number = 0;
    tensionWarnings: number = 0;
    tensionRedAlerts: number = 0;
    monoxidoSafes: number = 0;
    monoxidoWarnings: number = 0;
    monoxidoRedAlerts: number = 0;
    gasesSafes: number = 0;
    gasesWarnings: number = 0;
    gasesRedAlerts: number = 0;
    totalSafes: number = 0;
    totalWarnings: number = 0;
    totalRedAlerts: number = 0;
    totalNotActive: number = 0;

    updateRecords(historic: { type: any; safe: number; warning: number; redAlert: number; Safe: number; disabled: number; }){
        switch (historic.type) {
            case "temperature":
              this.temperatureSafes = historic.safe;
              this.temperatureWarnings = historic.warning;
              this.temperatureRedAlerts = historic.redAlert;
              break;
            case "presion":
              this.presionSafes = historic.safe;
              this.presionWarnings = historic.warning;
              this.presionRedAlerts = historic.redAlert;
              break;
            case "viento":
              this.vientoSafes = historic.safe;
              this.vientoWarnings = historic.warning;
              this.vientoRedAlerts = historic.redAlert;
              break;
            case "niveles":
              this.nivelesSafes = historic.safe;
              this.nivelesWarnings = historic.warning;
              this.nivelesRedAlerts = historic.redAlert;
              break;
            case "energia":
              this.energiaSafes = historic.safe;
              this.energiaWarnings = historic.warning;
              this.energiaRedAlerts = historic.redAlert;
              break;
            case "tension":
              this.tensionSafes = historic.safe;
              this.tensionWarnings = historic.warning;
              this.tensionRedAlerts = historic.redAlert;
              break;
            case "monoxido":
              this.monoxidoSafes = historic.safe;
              this.monoxidoWarnings = historic.warning;
              this.monoxidoRedAlerts = historic.redAlert;
              break;
            case "gas":
              this.gasesSafes = historic.safe;
              this.gasesWarnings = historic.warning;
              this.gasesRedAlerts = historic.redAlert;
              break;
            case "totals":
              this.totalSafes = historic.safe;
              this.totalWarnings = historic.warning;
              this.totalRedAlerts = historic.redAlert;
              this.totalNotActive = historic.disabled;
          }
    }
}