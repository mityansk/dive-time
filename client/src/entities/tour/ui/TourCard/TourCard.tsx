import { JSX, useState } from 'react'
import { ITour } from '../../model'
import styles from './TourCard.module.css'
import TourUpdateForm from '../TourUpdateForm/TourUpdateForm'

interface TourCardProps {
	tour: ITour
	onClick: () => void
}

export default function TourCard({ tour, onClick }: TourCardProps): JSX.Element {
	const { location_name, description, date } = tour
	// const author = tour.author.username

	const [isEditing, setIsEditing] = useState(false);

	  const handleSave = () => {
      setIsEditing(false); 
    };
	return    ( <>
      {isEditing ? (
        <TourUpdateForm tour={tour} onSave={handleSave} />
      ) : (
        <div className={styles.card} onClick={onClick}>
          <span className={styles.location}>Локация: {tour.location_name}</span>
          <span className={styles.description}>Описание: {tour.description}</span>
          <span className={styles.date}>Дата: {tour.date}</span>
          <span className={styles.author}>Автор тура: Pupkin</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setIsEditing(true);
            }}
            className={styles.editButton}
          >
            Редактировать
          </button>
        </div>
      )}
    </>
  );
}
