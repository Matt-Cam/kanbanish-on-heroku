import {
  ADD_CARD_LIST_ITEM,
  REMOVE_CARD_LIST_ITEM,
  ADD_CARD,
  DELETE_CARD,
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
function cards(state = initialState, action) {
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
    case ADD_CARD:
      return {
        ...state,
        cards: state.cards.concat(action.payload)
      };
    case DELETE_CARD:
      const indexOfCardToDelete = state.cards.findIndex(
        card => card._id === action.payload
      );
      const cardsToSplice = [...state.cards];
      cardsToSplice.splice(indexOfCardToDelete, 1);
      return {
        ...state,
        cards: cardsToSplice
      };
    case ADD_CARD_LIST_ITEM:
      console.log('addcardlistitem reducer case hit');
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
      console.log('removecardlistitem reducer case hit');
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

export default cards;
