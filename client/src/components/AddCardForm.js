import React, { useState } from 'react';

const AddCardForm = props => {
  let [state, setState] = useState({
    cardTitle: '',
    cardList: '',
    formErrors: { title: '', list: '' },
    titleValid: false,
    listValid: false,
    formValid: false
  });

  function validateFieldAndSetState(fieldName, value) {
    let fieldValidationErrors = state.formErrors;
    let titleValid = state.titleValid;
    let listValid = state.listValid;

    switch (fieldName) {
      case 'cardTitle':
        //make sure the title is alphanumeric
        // let titleValid = value.match(/^[a-z0-9]+$/i);
        titleValid = value.length >= 1;
        fieldValidationErrors.title = titleValid
          ? ''
          : 'Title required and can only contain alphanumeric';
        break;
      case 'cardList':
        listValid = value.length >= 1;
        fieldValidationErrors.list = listValid
          ? ''
          : `yo the list shouldn't be empty. please enter atleast one list item`;
        break;
      default:
        break;
    }

    setState({
      ...state,
      formErrors: fieldValidationErrors,
      titleValid: true,
      listValid: listValid,
      formValid: titleValid && listValid,
      [fieldName]: value
    });
  }

  function handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    validateFieldAndSetState(name, value);
  }
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.addCard(state.cardTitle, state.cardList.split(','));
        props.closeForm();
      }}
    >
      <label>Title of card</label>
      <br></br>
      <input
        type='text'
        name='cardTitle'
        value={state.cardTitle}
        onChange={e => handleUserInput(e)}
      ></input>
      <br></br>
      <label>Item list (separate different items by commas)</label>
      <br></br>
      <input
        type='text'
        name='cardList'
        value={state.cardList}
        onChange={e => handleUserInput(e)}
      ></input>
      <br></br>
      <button className='button mc-btn-secondary' type='submit'>
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;
