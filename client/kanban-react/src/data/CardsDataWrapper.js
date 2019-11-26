import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchCards from '../redux/actions/fetchCards';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  getCards,
  getCardsError,
  getCardsPending
} from '../redux/selectors/index';

const CardsDataWrapper = ({ render, cards, pending, error, fetchCards }) => {
  // fetch cards on load
  useEffect(() => {
    fetchCards();
  }, []);

  return pending ? <LoadingSpinner></LoadingSpinner> : render(cards);
};

// Matt comment:
// This component demostrates one way of separating data logic from presentational component
// Create a data component that uses render props to display
//  	it's data. In the presentational component you would then pass a function to render the data
const mapStateToProps = state => ({
  cards: getCards(state),
  pending: getCardsPending(state),
  error: getCardsError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCards: () => dispatch(fetchCards())
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsDataWrapper);
