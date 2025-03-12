import { JSX } from "react";
import { ITour } from "../model";

interface TourCardProps {
  tour: ITour
}

export default function TourCard({tour}: TourCardProps): JSX.Element {
  const { location_name, description, date } = tour
  //! const author = tour.author.username
  return (
		<>
			<div>
				<span>Локация: {location_name}</span>
				<span>Описание: {description}</span>
				<span>Дата: {date}</span>
				{/* <span>Автор тура: {author}</span> */}
				<span>Автор тура: Pupkin</span>
			</div>
		</>
	)
}