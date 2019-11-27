import {
  ADD_CARD_LIST_ITEM,
  REMOVE_CARD_LIST_ITEM,
  FETCH_CARDS_ERROR,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_PENDING
} from '../constants/action-types';
import {
  fetchCardsFromServer,
  removeCardItemFromServer,
  addCardListItemToServer
} from './api-calls';

export function fetchCards() {
  return async function(dispatch) {
    dispatch(fetchCardsPending());
    try {
      fetchCardsFromServer().then(data => {
        dispatch(fetchCardsSuccess(data.cards));
      });
    } catch (er) {
      dispatch(fetchCardsError);
      alert('error happening in actions/index.js');
      console.log(er);
    }
  };
}

// Payload should be something like {cardId: someid, desc: somedesc}
export function addCardListItem(payload) {
  return async function(dispatch) {
    try {
      addCardListItemToServer(payload.id, payload.desc).then(x => {
        console.log('addcardlistitem action creator');
        dispatch({ type: ADD_CARD_LIST_ITEM, payload });
      });
    } catch (er) {
      console.log('mc error', er);
    }
  };
}

// Payload should be something like {cardId, itemIndex}
export function removeCardListItem(cardId, itemIndex) {
  return async function(dispatch) {
    try {
      const removedItemResponse = await removeCardItemFromServer(
        cardId,
        itemIndex
      );
      console.log(removedItemResponse);
      dispatch({
        type: REMOVE_CARD_LIST_ITEM,
        cardId: removedItemResponse.card.cardNumber,
        itemIndex
      });
    } catch (er) {
      console.log('mc err: ' + er);
    }
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

// Function called to move list item from one list to another.
// It dispatches two action creators, one to add and one to remove
export function moveCardListItem(cardId, itemId, text, direction) {
  return function(dispatch) {
    console.log('moveRight reiniitated');
    let directionInt = direction === 'right' ? 1 : -1;
    dispatch(addCardListItem(cardId + directionInt, text));
    dispatch(removeCardListItem(cardId, itemId));
  };
}
