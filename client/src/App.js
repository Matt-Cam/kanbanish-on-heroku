import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import CardsContainer from './components/CardsContainer';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Kanban(<i>ish</i>) built with <strong>React&Redux</strong>
        </p>
      </header>
      <CardsContainer></CardsContainer>
    </div>
  );
}

export default connect()(App);
