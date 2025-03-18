import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getTourByIdThunk } from '@/entities/tour/api';
import { Modal, Spin } from 'antd';
import { useNavigate } from 'react-router';
import styles from './OneTourModal.module.css'

interface TourModalProps {
  tourId: number;
  isOpen: boolean;
  onClose: () => void;
}

const OneTourModal: React.FC<TourModalProps> = ({
  tourId,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { one_tour, isLoading, error } = useAppSelector((state) => state.tour);
  const navigate = useNavigate();
  const startDate = one_tour?.start_date;
  const endDate = one_tour?.end_date;

  useEffect(() => {
    if (isOpen && tourId) {
      dispatch(getTourByIdThunk(tourId));
    }
  }, [isOpen, tourId, dispatch]);

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (one_tour) {
      navigate(`/locations/${one_tour.location_id}`);
    }
  };

  return (
    <Modal
      title="Информация о туре"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={styles.modalContent} 
    >
      {isLoading && (
        <div className={styles.spinContainer}>
          <Spin />
        </div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
      {one_tour && (
        <div>
          <img
            className={styles.modalImage}
            alt="Фотография карточки тура"
            src={`http://localhost:3000/${one_tour.image}`}
          />
          <h2 className={styles.modalTitle} onClick={handleLocationClick}>
            {one_tour.location_name}{' '}
            <span className={styles.locationLink}>⬅ Узнать подробнее</span>
          </h2>
          <p className={styles.modalDescription}>{one_tour.description}</p>
          <p className={styles.modalDate}>Дата начала тура: {startDate}</p>
          <p className={styles.modalDate}>Дата конца тура: {endDate}</p>
          <p className={styles.modalAuthor}>
            Автор: {one_tour.author.username}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default OneTourModal;
