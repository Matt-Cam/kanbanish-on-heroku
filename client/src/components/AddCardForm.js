import React, { useState } from 'react';
import { FormErrors } from './FormErrors';

const AddCardForm = props => {
  let [state, setState] = useState({
    cardTitle: '',
    cardList: '',
    formErrors: { title: '', list: '' },
    titleValid: false,
    listValid: false,
    formValid: false
  });

  function handleUserInput(e) {
    let listValid = state.listValid;
    const name = e.target.name;
    const value = e.target.value;
    let fieldValidationErrors = state.formErrors;
    let titleValid = state.titleValid;

    // First we validate the input
    switch (name) {
      case 'cardTitle':
        titleValid = value.length >= 2;
        fieldValidationErrors.title = titleValid
          ? ''
          : 'Title required and needs to atleast 2 chars';
        break;
      case 'cardList':
        listValid = value.length >= 2;
        fieldValidationErrors.list = listValid
          ? ''
          : 'Yo the list needs to contain atleast 2 chars';
        break;
      default:
        break;
    }

    setState({
      ...state,
      formErrors: fieldValidationErrors,
      titleValid: titleValid,
      listValid: listValid,
      formValid: titleValid && listValid,
      [name]: value
    });
    console.log(state.formErrors);
  }
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.addCard(state.cardTitle, state.cardList.split(','));
        props.closeForm();
      }}
    >
      <FormErrors formErrors={state.formErrors} />
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
      <button
        className='button mc-btn-secondary'
        type='submit'
        disabled={!state.formValid}
      >
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;
