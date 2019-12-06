import React, { useState } from 'react';

const AddCardForm = props => {
  let [newCardTitle, setCardTitle] = useState('');
  let [newCardList, setCardList] = useState('');
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.addCard(newCardTitle, newCardList);
        props.closeForm();
      }}
    >
      <label>Title of card</label>
      <br></br>
      <input onChange={e => setCardTitle(e.target.value)}></input>
      <br></br>
      <label>Comma separated list</label>
      <br></br>
      <input onChange={e => setCardList(e.target.value)}></input>
      <br></br>
      <button className='button mc-btn-secondary' type='submit'>
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;
