export interface IAddTourData {
  image?: string;
  location_name: string;
  description: string;
  date_strings?: [string, string]
  start_date: string
  end_date: string;
  author_id: number;
  //! ФОТО ЛОКАЦИИ
}

export interface IAddTourDataWithId {
  id: number;
  image: string;
  location_name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export type DeleteTourIdType = number

export interface ITour extends IAddTourDataWithId {
  isDone: boolean;
  location_id: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    username: string;
  };
}

export type TourArrayType = ITour[];
