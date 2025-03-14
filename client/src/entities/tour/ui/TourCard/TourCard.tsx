import { JSX, useState } from 'react';
import { ITour } from '../../model';
import styles from './TourCard.module.css';
import TourUpdateForm from '../TourUpdateForm/TourUpdateForm';

interface TourCardProps {
  tour: ITour;
  onClick: () => void;
}

export default function TourCard({
  tour,
  onClick,
}: TourCardProps): JSX.Element {
  const { image, location_name, description, start_date, end_date } = tour;
  // const author = tour.author.username

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <>
      {isEditing ? (
        <TourUpdateForm tour={tour} onSave={handleSave} />
      ) : (
        <div className={styles.card} onClick={onClick}>
          <img
            style={{
              width: '239px',
            }}
            alt="Фотография карточки тура"
            src={`http://localhost:3000/${image}`}
          />
          <span className={styles.location}>Локация: {location_name}</span>
          <span className={styles.description}>Описание: {description}</span>
          <span className={styles.date}>Дата начала тура: {start_date}</span>
          <span className={styles.date}>Дата конца тура: {end_date}</span>
          {/* <span>Автор тура: {author}</span> */}
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
