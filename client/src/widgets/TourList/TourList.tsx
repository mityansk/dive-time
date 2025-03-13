import { JSX, useEffect } from 'react'
import { ITour } from '@/entities/tour/model'
import TourCard from '@/entities/tour/ui/TourCard/TourCard'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { getTourThunk } from '@/entities/tour/api'
import styles from './TourList.module.css'

export default function TourList(): JSX.Element {
	const tours = useAppSelector(state => state.tour.tour)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTourThunk())
	}, [dispatch])

	return (
		<div>
			<h1 className={styles.header}>Список туров</h1>
			{tours.length === 0 ? (
				<div className={styles.noTours}>Туры не найдены</div>
			) : (
				<div className={styles.tourList}>
					{tours.map((tour_el: ITour) => (
						<TourCard key={tour_el.id} tour={tour_el} />
					))}
				</div>
			)}
		</div>
	)
}
