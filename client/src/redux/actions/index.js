import {
  ADD_CARD_LIST_ITEM,
  REMOVE_CARD_LIST_ITEM,
  FETCH_CARDS_ERROR,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_PENDING,
  ADD_CARD,
  DELETE_CARD
} from '../constants/action-types';
import {
  fetchCardsFromServer,
  removeCardItemFromServer,
  addCardListItemToServer,
  addNewCardToServer,
  deleteCardFromServer
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
  const { id, desc } = payload;
  console.log('addcardlistitem starting');
  return function(dispatch) {
    try {
      addCardListItemToServer(id, desc).then(x => {
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
          cardNumber: response.card.cardNumber,
          itemIndex
        });
      })
      .catch(er =>
        console.log('mc err found in removeCardListItem action creator: ' + er)
      );
  };
}

// DELETE a single card by id (mongo id for this card/document)
export function deleteCard(cardId) {
  return dispatch => {
    try {
      deleteCardFromServer(cardId).then(response => {
        dispatch(deleteCardActionCreator(cardId));
      });
    } catch (er) {
      console.log(er);
    }
  };
}
export function deleteCardActionCreator(cardId) {
  return {
    type: DELETE_CARD,
    payload: cardId
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
//determine card to pass to based on direction parameter and then pass params through to moveCardListItem action creator
export function moveCardListItemLeftOrRight(
  _id,
  cardNum,
  itemId,
  text,
  direction
) {
  return function(dispatch, getState) {
    let moveToCard =
      direction === 'right'
        ? findRightSiblingCard(getState(), cardNum)
        : findLeftSiblingCard(getState(), cardNum);
    let moveToCardId = moveToCard._id;
    dispatch(moveCardListItem(_id, cardNum, itemId, text, moveToCardId));
  };
}

// Function called to move list item from one list to another.
// It dispatches two action creators, one to add and one to remove
export function moveCardListItem(
  _id,
  cardNum,
  itemId,
  text,
  _idOfCardToMoveTo
) {
  return function(dispatch) {
    try {
      dispatch(addCardListItem({ id: _idOfCardToMoveTo, desc: text }));
      dispatch(removeCardListItem(_id, itemId));
    } catch (e) {
      console.log(e);
    }
  };
}
