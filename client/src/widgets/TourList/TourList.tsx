import { JSX, useEffect, useState } from 'react'
import { ITour } from '@/entities/tour/model'
import TourCard from '@/entities/tour/ui/TourCard/TourCard'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { getTourByIdThunk, getTourThunk } from '@/entities/tour/api'
import styles from './TourList.module.css'
import OneTourModal from '@/components/OneTourModal/OneTourModal'


export default function TourList(): JSX.Element {
	const tours = useAppSelector(state => state.tour.tour)
	const { one_tour, isLoading, error } = useAppSelector(state => state.tour) //!experement
	const dispatch = useAppDispatch()

	const [isModalOpen, setIsModalOpen] = useState(false) //!experement
	const [selectedTourId, setSelectedTourId] = useState<number | null>(null) //!experement

	useEffect(() => {
		dispatch(getTourThunk())
	}, [dispatch])

	const handleTourClick = (id: number) => {
		setSelectedTourId(id) // Устанавливаем ID выбранного тура
		setIsModalOpen(true) // Открываем модальное окно
		dispatch(getTourByIdThunk(id)) // Загружаем данные о туре
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
							onClick={() => handleTourClick(tour_el.id)} // Передаем обработчик клика
						/>
					))}
				</div>
			)}

			{/* Модальное окно */}
			{selectedTourId && (
				<OneTourModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					tour={one_tour} // Передаем данные о туре
					isLoading={isLoading}
					error={error}
				/>
			)}
		</div>
	)
}
