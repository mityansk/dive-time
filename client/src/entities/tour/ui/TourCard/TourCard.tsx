import { JSX, useState } from 'react';
import { ITour } from '../../model';
import styles from './TourCard.module.css';
import TourUpdateForm from '../TourUpdateForm/TourUpdateForm';
import dayjs from 'dayjs';

interface TourCardProps {
  tour: ITour;
  onClick: () => void;
}

export default function TourCard({
  tour,
  onClick,
}: TourCardProps): JSX.Element {
  const { image, location_name, description, start_date, end_date } = tour;
  const startDate = dayjs(start_date).format('DD.MM.YYYY')
  const endDate = dayjs(end_date).format('DD.MM.YYYY')
  
  

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
          <span className={styles.date}>Дата начала тура: {startDate}</span>
          <span className={styles.date}>Дата конца тура: {endDate}</span>
          <span>
            Автор тура:{' '}
            {tour.author ? tour.author.username : 'Автор неизвестен'}
          </span>
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
