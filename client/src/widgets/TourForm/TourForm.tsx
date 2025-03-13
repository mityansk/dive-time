import { addTourThunk } from "@/entities/tour/api"
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks"
import { useState } from "react"
import { useNavigate } from "react-router"
import TourFormModal from '@/components/TourFormModal/TourFormModal'

export default function TourForm() {
  const INITIAL_INPUTS_DATA = {
		location_name: '',
		description: '',
    data: '',
	}
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onSubmitHandler = async () => {
    try {
      const sendData = {...inputs, author_id: user!.id}
      dispatch(addTourThunk(sendData))
      navigate(CLIENT_ROUTES.NOT_FOUND) //!ВРЕМЕННО НАВИГИРУЕТ НА 404
      setIsModalOpen(false)
    } catch (error) {
      alert(error)
    }
  }

  return (
		<div>
			<button
				onClick={() => setIsModalOpen(true)}
				style={{
					padding: '10px 20px',
					backgroundColor: '#1890ff',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
				}}
			>
				Создать тур
			</button>

			<TourFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<form onSubmit={onSubmitHandler}>
					<div style={{ marginBottom: '16px' }}>
						<label>Название локации:</label>
						<input
							type='text'
							name='location_name'
							value={inputs.location_name}
							onChange={onChangeHandler}
							required
							style={{
								width: '100%',
								padding: '8px',
								borderRadius: '4px',
								border: '1px solid #ddd',
							}}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label>Описание:</label>
						<textarea
							name='description'
							value={inputs.description}
							onChange={onChangeHandler}
							required
							style={{
								width: '100%',
								padding: '8px',
								borderRadius: '4px',
								border: '1px solid #ddd',
								resize: 'vertical',
							}}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label>Дата:</label>
						<input
							type='date'
							name='date'
							value={inputs.date}
							onChange={onChangeHandler}
							required
							style={{
								width: '100%',
								padding: '8px',
								borderRadius: '4px',
								border: '1px solid #ddd',
							}}
						/>
					</div>

					<button
						type='submit'
						style={{
							width: '100%',
							padding: '10px',
							backgroundColor: '#1890ff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						Создать
					</button>
				</form>
			</TourFormModal>
		</div>
	)
}