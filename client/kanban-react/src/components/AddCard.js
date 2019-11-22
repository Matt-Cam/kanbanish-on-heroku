import React, { useState } from 'react';
import Modal from './Modal';
const AddCard = () => {
	const [show, toggleModal] = useState(false);
	return (
		<React.Fragment>
			<Modal open={show} closeCallback={() => toggleModal(false)}></Modal>
			<div className='empty-card-container'>
				<button
					className='button mc-btn-secondary round'
					onClick={() => toggleModal(true)}
				>
					Add New Card
				</button>
			</div>
		</React.Fragment>
	);
};

export default AddCard;
