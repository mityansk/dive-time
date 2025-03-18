import { JSX, useEffect, useState } from 'react'
import { DeleteTourIdType, ITour } from '@/entities/tour/model'
import TourCard from '@/entities/tour/ui/TourCard/TourCard'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { deleteTourThunk, getTourByIdThunk, getTourThunk } from '@/entities/tour/api'
import styles from './TourList.module.css'
import OneTourModal from '@/components/OneTourModal/OneTourModal'

interface TourListProps {
  isProfile?: boolean; 
}

export default function TourList({ isProfile = false }: TourListProps): JSX.Element {
  const tours = useAppSelector((state) => state.tour.tour);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getTourThunk());
  }, [dispatch]);

  const displayedTours = isProfile
    ? tours.filter((tour) => tour.author.id === user?.id)
    : tours;

  const handleTourClick = (id: number) => {
    setSelectedTourId(id);
    setIsModalOpen(true);
    dispatch(getTourByIdThunk(id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTourId(null);
  };

  const handleDelete = (id: DeleteTourIdType) => {
    try {
      dispatch(deleteTourThunk(id));
      console.log('Тур успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении тура:', error);
    }
  };

  return (
    <div>
      <h1 className={styles.header}>
        {isProfile ? 'Список моих туров' : 'Список туров'}
      </h1>
      {displayedTours.length === 0 ? (
        <div className={styles.noTours}>Туры не найдены</div>
      ) : (
        <div className={styles.tourList}>
          {displayedTours.map((tour_el: ITour) => (
            <TourCard
              key={tour_el.id}
              tour={tour_el}
              onClick={() => handleTourClick(tour_el.id)}
              onDelete={isProfile ? handleDelete : undefined}
              isProfile={isProfile}
            />
          ))}
        </div>
      )}

      {selectedTourId && (
        <OneTourModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          tourId={selectedTourId}
        />
      )}
    </div>
  );
}
