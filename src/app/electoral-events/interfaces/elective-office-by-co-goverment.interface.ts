export interface ElectiveOfficeByCoGoverment {
  coGoverment: CoGoverment;
  electiveOffices: ElectiveOffice[];
}

export interface CoGoverment {
  id: string;
  name: string;
}

export interface ElectiveOffice {
  quantity: number;
  id: string;
  name: string;
}
