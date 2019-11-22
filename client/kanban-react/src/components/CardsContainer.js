import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import AddCard from './AddCard.js';
import PropTypes from 'prop-types';
import { LoadingSpinner } from './LoadingSpinner';
import axios from 'axios';

// Container component to hold all of the cards
const CardsContainer = ({ cards, fetchCards, error, pending }) => {
  const [testLocalState, setTestLocalState] = useState([]);
  useEffect(() => {
    fetchCards();
  }, []);

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

  if (pending) return <LoadingSpinner></LoadingSpinner>;
  else
    return (
      <React.Fragment>
        <button onClick={testApiGetCall} className='button mc-btn-secondary'>
          Test Api GET /api/cards/
        </button>
        <button onClick={testApiPostCall} className='button mc-btn-secondary'>
          Test POST /api/cards/seed
        </button>
        <button onClick={testApiDeleteCall} className='button mc-btn-secondary'>
          Test DELETE /api/cards/
        </button>

        <div className='cards-container'>
          {cards.map((card, index) => {
            return <Card key={index} {...card}></Card>;
          })}
          <AddCard></AddCard>
        </div>
      </React.Fragment>
    );
};

// Define the proptypes for CardsContainer component
CardsContainer.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      list: PropTypes.array.isRequired
    }).isRequired
  ).isRequired
};

export default CardsContainer;
