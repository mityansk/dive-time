import { ILocation } from '../../model';

interface LocationCardProps {
	location: ILocation;
}
export function LocationCard({ location }: LocationCardProps) {
	return (
		<div>
			<h2>{location.name}</h2>
			<p>{location.description}</p>
			<img
				className='CardImg'
				alt='Фотография карточки'
				src={`http://localhost:3000/${location.image}`}
			/>
		</div>
	);
}
