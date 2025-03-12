import { JSX, useEffect } from "react";
import { ITour } from "@/entities/tour/model";
import TourCard from "@/entities/tour/ui/TourCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getTourThunk } from "@/entities/tour/api";

export default function TourList(): JSX.Element {
  const tours = useAppSelector((state) => state.tour.tour)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTourThunk())
  }, [dispatch])
  return (
		<div>
			{tours.map((tour_el: ITour) => (
				<TourCard key={tour_el.id} tour={tour_el} />
			))}
		</div>
	)
}