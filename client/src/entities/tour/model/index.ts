export interface IAddTourData {
	location_name: string
	description: string
	date: string
	//! ФОТО ЛОКАЦИИ
}

export interface IAddTourDataWithId extends IAddTourData {
  id: number
}


export interface ITour extends IAddTourDataWithId {
	author_id: number
	createdAt: Date
	updatedAt: Date
	author: {
		id: number
		username: string
		email: string
	}
}

export type TourArrayType = ITour[]

