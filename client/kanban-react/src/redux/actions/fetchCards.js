// fetchCards.js
import { fetchCardsPending, fetchCardsSuccess, fetchCardsError } from './index';

function fetchCards() {
  return dispatch => {
    console.log('fetch call made on server');
    dispatch(fetchCardsPending());

    // this type of stringing of then's can also be accomplished via await:
    // const response = await fetch('/api/cards');
    // const myJson = await response.json();
    fetch('/api/cards/')
      .then(res => res.json())
      .then(resjson => {
        if (resjson.error) {
          throw resjson.error;
        }
        console.log(resjson);
        dispatch(fetchCardsSuccess(resjson.cards));
      })
      .catch(error => {
        dispatch(fetchCardsError(error));
      });
  };
}

export default fetchCards;
