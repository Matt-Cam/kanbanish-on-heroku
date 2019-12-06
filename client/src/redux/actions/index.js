import {
  ADD_CARD_LIST_ITEM,
  REMOVE_CARD_LIST_ITEM,
  FETCH_CARDS_ERROR,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_PENDING,
  ADD_CARD
} from '../constants/action-types';
import {
  fetchCardsFromServer,
  removeCardItemFromServer,
  addCardListItemToServer,
  addNewCardToServer
} from './api-calls';

import { defaultHeaders } from '../../data/defaultHeaders';

import {
  findRightSiblingCard,
  findLeftSiblingCard,
  findMaxCardNumber
} from '../selectors/index';

export function fetchCards() {
  return function(dispatch) {
    dispatch(fetchCardsPending());
    try {
      fetchCardsFromServer().then(data => {
        dispatch(fetchCardsSuccess(data.cards));
      });
    } catch (er) {
      dispatch(fetchCardsError);
      alert('error in fetching cards');
      console.log(er);
    }
  };
}

// Payload should be something like {id: some cardid should align with id from mongo, desc: somedesc}
export function addCardListItem(payload) {
  return async function(dispatch) {
    try {
      addCardListItemToServer(payload.id, payload.desc).then(x => {
        console.log('addcardlistitem action creator');
        dispatch({ type: ADD_CARD_LIST_ITEM, payload });
      });
    } catch (er) {
      console.log('mc error occured in addCardListItem action creator', er);
    }
  };
}

// Payload should be something like {cardId, itemIndex}
export function removeCardListItem(cardId, itemIndex) {
  return function(dispatch) {
    removeCardItemFromServer(cardId, itemIndex)
      .then(response => {
        dispatch({
          type: REMOVE_CARD_LIST_ITEM,
          cardId: response.card.cardNumber,
          itemIndex
        });
      })
      .catch(er =>
        console.log('mc err found in removeCardListItem action creator: ' + er)
      );
  };
}

export function fetchCardsError(error) {
  return {
    type: FETCH_CARDS_ERROR,
    error: error
  };
}

export function fetchCardsPending() {
  return {
    type: FETCH_CARDS_PENDING
  };
}

export function fetchCardsSuccess(cards) {
  return {
    type: FETCH_CARDS_SUCCESS,
    cards: cards
  };
}

export function addCardSuccess(card) {
  return {
    type: ADD_CARD,
    payload: card
  };
}

// payload: {number, title, list}
export function addNewCard(title, list) {
  console.log('adding card to API');
  return function(dispatch, getState) {
    // new card number will be max + 1
    const newCardNumber = findMaxCardNumber(getState()) + 1;
    addNewCardToServer(title, newCardNumber, list).then(jsonRes => {
      console.log('Created card:', jsonRes);
      dispatch(addCardSuccess(jsonRes.card));
    });
  };
}

// Function called to move list item from one list to another.
// It dispatches two action creators, one to add and one to remove
export function moveCardListItem(_id, cardNum, itemId, text, direction) {
  return function(dispatch, getState) {
    //let directionInt = direction === 'right' ? 1 : -1;
    let moveToCard =
      direction === 'right'
        ? findRightSiblingCard(getState(), cardNum)
        : findLeftSiblingCard(getState(), cardNum);
    let moveToCardId = moveToCard._id;
    try {
      let x = addCardListItem({ id: moveToCardId, desc: text });
      dispatch(x);
      dispatch(removeCardListItem(_id, itemId));
    } catch (e) {
      console.log(e);
    }
  };
}
