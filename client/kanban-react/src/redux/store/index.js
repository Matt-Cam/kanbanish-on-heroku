// src/redux/store/index.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import cardsReducer from '../reducers/cardsReducer';

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  cardsReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
