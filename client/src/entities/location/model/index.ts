export interface ILocationRowData {
	name: string;
	coordinateX: string;
	coordinateY: string;
	description: string;
	complexity: string;
	deep: string;
	image: string; 
	arrayImage: []; 
}

export interface ILocation extends ILocationRowData {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

export type LocationArrayType = ILocation[];

