import { connect } from 'react-redux';
import CardsContainer from '../components/CardsContainer';
import fetchCards from '../redux/actions/fetchCards';
import {
	getCards,
	getCardsError,
	getCardsPending
} from '../redux/selectors/index';

// Matt comment:
// This component demostrates one way of separating data logic from presentational component
// The other main way would be to create a data component that uses render props to display
// ---> it's data. In the presentational component you would then pass a function to render the data
const mapStateToProps = (state) => ({
	cards: getCards(state),
	pending: getCardsPending(state),
	error: getCardsError(state)
});

const mapDispatchToProps = (dispatch) => ({
	fetchCards: () => dispatch(fetchCards())
});

const CardsDataContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardsContainer);

export default CardsDataContainer;
