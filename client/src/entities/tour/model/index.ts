export interface IAddTourData {
  location_name: string;
  description: string;
  date: string;
  author_id: number;
  //! ФОТО ЛОКАЦИИ
}

export interface IAddTourDataWithId extends IAddTourData {
  id: number;
}

export interface ITour extends IAddTourDataWithId {
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    username: string;
  };
}

export type TourArrayType = ITour[];
