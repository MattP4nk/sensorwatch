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
}