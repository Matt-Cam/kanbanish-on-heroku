import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from './Card.js';
import AddCard from './AddCard.js';
import { LoadingSpinner } from './LoadingSpinner';
import axios from 'axios';
import {
  getCards,
  getCardsPending,
  getCardsError
} from '../redux/selectors/index';
import { fetchCards, addNewCard } from '../redux/actions/index';

// Container component to hold all of the cards
const CardsContainer = ({
  render,
  cards,
  pending,
  error,
  fetchCards,
  addCard
}) => {
  // fetch cards on load
  useEffect(() => {
    fetchCards();
  }, []);

  return pending ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <React.Fragment>
      {error && <span className='card-list-error'>{error}</span>}
      <div className='cards-container'>
        {cards.map((card, i) => {
          return card ? (
            <Card
              key={card._id}
              _id={card._id}
              id={card.cardNumber}
              list={card.list}
              title={card.title}
              isFirst={i === 0}
              isLast={i >= cards.length - 1}
            ></Card>
          ) : (
            <div>empty</div>
          );
        })}
        <AddCard addCard={addCard}></AddCard>
      </div>
      <hr className='bigbreak'></hr>
      <h1>below area is just for dev purposes</h1>
      <h4>buttons to test network calls</h4>
      <button onClick={testApiGetCall} className='button mc-btn-secondary'>
        Test Api GET /api/cards/
      </button>
      <button onClick={testApiPostCall} className='button mc-btn-secondary'>
        Test POST /api/cards/seed
      </button>
      <button onClick={testApiDeleteCall} className='button mc-btn-secondary'>
        Test DELETE /api/cards/
      </button>
      <p>fake spinner to tinker with styles</p>
      <LoadingSpinner></LoadingSpinner>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  cards: getCards(state),
  pending: getCardsPending(state),
  error: getCardsError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCards: () => dispatch(fetchCards()),
  addCard: (title, list) => dispatch(addNewCard(title, list))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);

const testApiGetCall = () => {
  axios
    .get('/api/cards/')
    .then(res => console.log(res.data))
    .catch(alert);
};
const testApiPostCall = () => {
  axios
    .post('/api/cards/seed', {})
    .then(res => console.log(res.data))
    .catch(alert);
};
const testApiDeleteCall = () => {
  axios
    .delete('/api/cards/', {})
    .then(res => console.log(res.data))
    .catch(alert);
};
