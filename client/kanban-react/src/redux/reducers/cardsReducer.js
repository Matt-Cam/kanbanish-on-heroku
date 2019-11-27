import {
  ADD_CARD_LIST_ITEM,
  REMOVE_CARD_LIST_ITEM,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  FETCH_CARDS_PENDING
} from '../constants/action-types';

const initialState = {
  pending: false,
  error: null,
  removedItems: [],
  cards: []
};
function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        pending: false,
        cards: action.cards
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case ADD_CARD_LIST_ITEM:
      console.log('addcardlistitem reducer');
      console.log(action.payload);
      return {
        ...state,
        cards: state.cards.map((card, index) => {
          if (card._id !== action.payload.id) {
            return card;
          } else {
            return {
              ...card,
              list: card.list.concat(action.payload.desc)
            };
          }
        })
      };

    case REMOVE_CARD_LIST_ITEM:
      console.log(action);
      return {
        ...state,
        cards: state.cards.map((card, index) => {
          if (index !== action.cardId) {
            return card;
          } else {
            return {
              ...card,
              list: card.list.filter((x, i) => {
                return i !== action.itemIndex;
              })
            };
          }
        })
      };
    default:
      return state;
  }
}

export default cardsReducer;
