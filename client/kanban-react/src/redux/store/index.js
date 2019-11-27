// src/redux/store/index.js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//import cardsReducer from '../reducers/cardsReducer';
import reducer from '../reducers/index';

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
