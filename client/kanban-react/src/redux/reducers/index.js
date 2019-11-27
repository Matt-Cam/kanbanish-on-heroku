import { combineReducers } from 'redux';
import todos from './todoTestReducer';
import cards from './cardsReducer';

export default combineReducers({
  todos,
  cards
});
