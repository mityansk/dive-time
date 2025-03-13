import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { JSX, useState } from 'react';
import { ITour } from '../../model';
import { updateTourThunk } from '../../api';
import styles from './TourUpdateForm.module.css';

interface TourUpdateFormProps {
  tour: ITour;
  onSave: () => void;
}

export default function TourUpdateForm({
  tour,
  onSave,
}: TourUpdateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [locationName, setLocationName] = useState(tour.location_name);
  const [description, setDescription] = useState(tour.description);
  const [start_date, setStart_Date] = useState(tour.start_date);
  const [end_date, setEnd_date] = useState(tour.end_date);

  const handleSave = async () => {
    try {
      await dispatch(
        updateTourThunk({
          image: tour.image,
          id: tour.id,
          location_name: locationName,
          description,
          start_date,
          end_date,
          author_id: tour.author_id,
        })
      ).unwrap();
      onSave();
    } catch (error) {
      console.error('Ошибка при обновлении тура:', error);
    }
  };

  return (
    <div className={styles.card}>
      <img
        style={{
          width: '239px',
        }}
        alt="Фотография карточки тура"
        src={`http://localhost:3000/${tour.image}`}
      />
      <input
        type="text"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <input
        type="date"
        value={start_date}
        onChange={(e) => setStart_Date(e.target.value)}
        className={styles.input}
      />
      <input
        type="date"
        value={end_date}
        onChange={(e) => setEnd_date(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSave} className={styles.button}>
        Сохранить
      </button>
    </div>
  );
}
