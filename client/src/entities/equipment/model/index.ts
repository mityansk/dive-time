export interface IAddEquipmentData {
  name: string;
  price: number;
  description: string;
  image: string;
  isRented: boolean;
  diveLocation_id: number;
}

export interface IEquipmentData {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  isRented?: boolean;
  diveLocation_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EquipmentArrayType = IEquipmentData[];
