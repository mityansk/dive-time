import { JSX } from 'react'
import { ITour } from '../../model'
import styles from './TourCard.module.css'

interface TourCardProps {
	tour: ITour
}

export default function TourCard({ tour }: TourCardProps): JSX.Element {
	const { location_name, description, date } = tour
	// const author = tour.author.username
	return (
		<>
			<div className={styles.card}>
				<span className={styles.location}>Локация: {location_name}</span>
				<span className={styles.description}>Описание: {description}</span>
				<span className={styles.date}>Дата: {date}</span>
				{/* <span>Автор тура: {author}</span> */}
				<span className={styles.author}>Автор тура: Pupkin</span>
			</div>
		</>
	)
}
