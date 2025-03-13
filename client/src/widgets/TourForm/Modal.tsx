import React from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: 'white',
					padding: '20px',
					borderRadius: '8px',
					width: '400px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				}}
			>
				{children}
				<button
					onClick={onClose}
					style={{
						marginTop: '10px',
						padding: '8px 16px',
						backgroundColor: '#ff4d4f',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}

export default Modal
