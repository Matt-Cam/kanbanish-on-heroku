import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import AddCardForm from './AddCardForm';

const AddCard = props => {
  const [show, toggleModal] = useState(false);

  return (
    <React.Fragment>
      <Modal open={show} closeCallback={() => toggleModal(false)}>
        <AddCardForm
          closeForm={() => toggleModal(false)}
          addCard={props.addCard}
        ></AddCardForm>
      </Modal>
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
