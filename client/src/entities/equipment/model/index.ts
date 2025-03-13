export interface IAddEquipmentData {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isRented: boolean;
  user_id: number;
  diveLocation_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateEquipmentData {
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

export type EquipmentArrayType = IAddEquipmentData[];
