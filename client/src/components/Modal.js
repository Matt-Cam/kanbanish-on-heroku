import ReactDOM from 'react-dom';
import React from 'react';

const Modal = ({ children, closeCallback, open }) => {
	return open
		? ReactDOM.createPortal(
				<div className='modal'>
					<div className='modal__overlay' onClick={closeCallback}></div>
					<div className='modal__content'>
						<div className='modal__close' onClick={closeCallback}>
							x
						</div>
						{children}
					</div>
				</div>,
				document.body
		  )
		: null;
};
export default Modal;
