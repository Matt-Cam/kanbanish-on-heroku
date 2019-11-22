import {
	ADD_CARD_LIST_ITEM,
	REMOVE_CARD_LIST_ITEM,
	FETCH_CARDS_ERROR,
	FETCH_CARDS_SUCCESS,
	FETCH_CARDS_PENDING
} from '../constants/action-types';

// Payload should be something like {cardId: someid, desc: somedesc}
export function addCardListItem(payload) {
	console.log(payload);
	return { type: ADD_CARD_LIST_ITEM, payload };
}

// Payload should be something like {cardId, itemIndex}
export function removeCardListItem(cardId, itemIndex) {
	return { type: REMOVE_CARD_LIST_ITEM, cardId, itemIndex };
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
