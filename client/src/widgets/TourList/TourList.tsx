import { JSX, useEffect, useState } from 'react'
import { ITour } from '@/entities/tour/model'
import TourCard from '@/entities/tour/ui/TourCard/TourCard'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { getTourByIdThunk, getTourThunk } from '@/entities/tour/api'
import styles from './TourList.module.css'
import OneTourModal from '@/components/OneTourModal/OneTourModal'


export default function TourList(): JSX.Element {
	const tours = useAppSelector(state => state.tour.tour)
	const { one_tour, isLoading, error } = useAppSelector(state => state.tour)
	const dispatch = useAppDispatch()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTourId, setSelectedTourId] = useState<number | null>(null)

	useEffect(() => {
		dispatch(getTourThunk())
	}, [dispatch])

	const handleTourClick = (id: number) => {
		setSelectedTourId(id)
		setIsModalOpen(true) 
		dispatch(getTourByIdThunk(id)) 
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedTourId(null)
	}

	return (
		<div>
			<h1 className={styles.header}>Список туров</h1>
			{tours.length === 0 ? (
				<div className={styles.noTours}>Туры не найдены</div>
			) : (
				<div className={styles.tourList}>
					{tours.map((tour_el: ITour) => (
						<TourCard
							key={tour_el.id}
							tour={tour_el}
							onClick={() => handleTourClick(tour_el.id)}
						/>
					))}
				</div>
			)}

			{selectedTourId && (
				<OneTourModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					tour={one_tour}
					isLoading={isLoading}
					error={error}
				/>
			)}
		</div>
	)
}
