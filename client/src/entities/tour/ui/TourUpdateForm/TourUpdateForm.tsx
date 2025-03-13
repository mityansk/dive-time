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
  const [date, setDate] = useState(tour.date);

  const handleSave = async () => {
    try {
      await dispatch(
        updateTourThunk({
          id: tour.id,
          location_name: locationName,
          description,
          date,
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
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSave} className={styles.button}>
        Сохранить
      </button>
    </div>
  );
}
