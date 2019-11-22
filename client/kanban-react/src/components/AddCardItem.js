import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addCardListItem } from '../redux/actions/index';

const mapDispatchToProps = (dispatch) => ({
	addCardListItem: (id, desc) => dispatch(addCardListItem({ id, desc }))
});

const AddCardItem = ({ addCardListItem, cardId, closeForm }) => {
	let [input, setInput] = useState('');
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		console.log(input);
	});
	return (
		<React.Fragment>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					addCardListItem(cardId, input);
					closeForm();
				}}
			>
				<input onChange={(e) => setInput(e.target.value)} />
				<button className='button mc-btn-secondary' type='submit'>
					Add Item
				</button>
			</form>
		</React.Fragment>
	);
};

export default connect(
	null,
	mapDispatchToProps
)(AddCardItem);
