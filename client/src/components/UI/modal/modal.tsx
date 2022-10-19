import React, { FC } from 'react'
import './modal.scss'

interface ModalProps {
	children: React.ReactNode;
	visible: boolean;
	setVisible: (visible: boolean) => void
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible }) => {
	let rootClass = ['modal']
	if (visible) {
		rootClass.push('active')
	}

	return (
		<div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
			<div className='modal__content' onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div >
	)
}

export default Modal