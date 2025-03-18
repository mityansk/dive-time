import { JSX, useState } from 'react';
import { ITour } from '../../model';
import styles from './TourCard.module.css';
import TourUpdateForm from '../TourUpdateForm/TourUpdateForm';

interface TourCardProps {
  tour: ITour;
  onClick: () => void;
  onDelete?: (id: number) => void;
  isProfile: boolean;
}

export default function TourCard({
  tour,
  onClick,
  onDelete,
  isProfile,
}: TourCardProps): JSX.Element {
  const { image, location_name, description, start_date, end_date } = tour;
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isEditing ? (
        <TourUpdateForm tour={tour} onSave={handleSave} />
      ) : (
        <div className={styles.card} onClick={onClick}>
          <img
            alt="Фотография карточки тура"
            src={`http://localhost:3000/${image}`}
          />
          <span className={styles.location}>Локация: {location_name}</span>
          <span className={styles.description}>Описание: {description}</span>
          <span className={styles.date}>Дата начала тура: {start_date}</span>
          <span className={styles.date}>Дата конца тура: {end_date}</span>
          <span className={styles.author}>
            Автор тура:{' '}
            {tour.author ? tour.author.username : 'Автор неизвестен'}
          </span>
          {isProfile && (
            <button onClick={toggleMenu} className={styles.menuButton}>
              ⚙️
            </button>
          )}
          {isMenuOpen && (
            <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className={styles.editButton}
                >
                  Редактировать
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(tour.id);
                  }}
                  className={styles.deleteButton}
                >
                  Удалить тур
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
