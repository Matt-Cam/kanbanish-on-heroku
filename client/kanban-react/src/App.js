import React from 'react';
import './App.css';

import CardsDataContainer from './data/CardsDataContainer.js';
import { connect } from 'react-redux';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Kanban(<i>ish</i>) built with <strong>React&Redux</strong>
				</p>
			</header>

			<CardsDataContainer></CardsDataContainer>
		</div>
	);
}

export default connect()(App);
