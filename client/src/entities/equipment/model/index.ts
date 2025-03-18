export interface IAddEquipmentData {
  name: string;
  price: number;
  description: string;
  image: string;
  isRented: boolean;
  address: string;
  coordinates: [number, number];
}

export interface IEquipmentData {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  isRented?: boolean;
  address?: string;
  coordinates?: [number, number];
  createdAt?: Date;
  updatedAt?: Date;
  user_id: number;
}

export type EquipmentArrayType = IEquipmentData[];
