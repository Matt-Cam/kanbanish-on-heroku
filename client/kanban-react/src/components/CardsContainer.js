import React from 'react';
import Card from './Card.js';
import AddCard from './AddCard.js';
import axios from 'axios';
import CardsDataWrapper from '../data/CardsDataWrapper.js';

// Container component to hold all of the cards
const CardsContainer = () => {
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
        <CardsDataWrapper
          render={cards => {
            return cards.map(card => {
              return (
                <Card
                  key={card.id}
                  id={card.id}
                  list={card.list}
                  title={card.title}
                ></Card>
              );
            });
          }}
        ></CardsDataWrapper>
        <AddCard></AddCard>
      </div>
    </React.Fragment>
  );
};

export default CardsContainer;
