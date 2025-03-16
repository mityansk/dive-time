import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getTourByIdThunk } from '@/entities/tour/api';
import { Modal, Spin } from 'antd';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

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
    const startDate = dayjs(one_tour?.start_date).format('DD.MM.YYYY')
    const endDate = dayjs(one_tour?.end_date).format('DD.MM.YYYY');
  

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
    >
      {isLoading && <Spin />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {one_tour && (
        <div>
          <img
            style={{
              width: '472px',
            }}
            alt="Фотография карточки тура"
            src={`http://localhost:3000/${one_tour.image}`}
          />
          <h2 onClick={handleLocationClick}>
            {one_tour.location_name} ⬅ Узнать подробнее
          </h2>
          <p>{one_tour.description}</p>
          <p>Дата начала тура: {startDate}</p>
          <p>Дата конца тура: {endDate}</p>
          <p>Автор: {one_tour.author.username}</p>
        </div>
      )}
    </Modal>
  );
};

export default OneTourModal;
