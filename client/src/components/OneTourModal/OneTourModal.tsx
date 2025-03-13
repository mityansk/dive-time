import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { getTourByIdThunk } from '@/entities/tour/api'
import { Modal, Spin } from 'antd'


interface TourModalProps {
	tourId: number
	isOpen: boolean
	onClose: () => void
}

const OneTourModal: React.FC<TourModalProps> = ({ tourId, isOpen, onClose }) => {
	const dispatch = useAppDispatch()
	const { one_tour, isLoading, error } = useAppSelector(state => state.tour)

	useEffect(() => {
		if (isOpen && tourId) {
			dispatch(getTourByIdThunk(tourId)) 
		}
	}, [isOpen, tourId, dispatch])

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
          <h2>{one_tour.location_name}</h2>
          <p>{one_tour.description}</p>
          <p>Дата начала тура: {one_tour.start_date}</p>
          <p>Дата конца тура: {one_tour.end_date}</p>
          {/* <p>Автор: {one_tour.author.username}</p> */}
          <p>Автор тура: Pupkin</p>
        </div>
      )}
    </Modal>
  );
}

export default OneTourModal
