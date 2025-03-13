// components/TourModal/TourModal.tsx
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { getTourByIdThunk } from '@/entities/tour/api'
import { Modal, Spin } from 'antd' // Используем Ant Design для модального окна

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
			title='Информация о туре'
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			{isLoading && <Spin />}
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{one_tour && (
				<div>
					<h2>{one_tour.location_name}</h2>
					<p>{one_tour.description}</p>
					<p>Дата: {(one_tour.date)}</p>
					{/* <p>Автор: {one_tour.author.username}</p> */}
				</div>
			)}
		</Modal>
	)
}

export default OneTourModal
