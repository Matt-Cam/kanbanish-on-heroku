// fetchCards.js

import { fetchCardsPending, fetchCardsSuccess, fetchCardsError } from './index';

//This will be replaced with api call
function fetchCards() {
	return dispatch => {
		setTimeout(() => {
			dispatch(fetchCardsPending());
		}, 10);
		setTimeout(() => {
			dispatch(fetchCardsSuccess(staticCards));
			return staticCards;
		}, 2000);
	};
}

export default fetchCards;

const staticCards = [
	{
		id: 0,
		title: 'Card One',
		list: [
			'item one for card one',
			'item two for card one',
			'item three for card one'
		]
	},
	{
		id: 1,
		title: 'Card Two',
		list: [
			'item one for card two',
			'item two for card two',
			'item three for card three'
		]
	},
	{
		id: 2,
		title: 'Card Three',
		list: [
			'item one for card three',
			'item two for card three',
			'item three for card three'
		]
	}
];

/* function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch('https://exampleapi.com/products')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.products);
            return res.products;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts; */
