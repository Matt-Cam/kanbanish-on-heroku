import React from 'react';
import './App.css';
import './Animations.css';
import BigLogo from './assets/Big Logo.png';

import { connect } from 'react-redux';
import CardsContainer from './components/CardsContainer';
import ExampleColors from './components/ExampleColors';
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={BigLogo} style={{ height: '50px' }}></img>
        <h4>
          built with <strong>Mongo, Express, React, and Redux</strong>
        </h4>
      </header>
      <CardsContainer></CardsContainer>
      <ExampleColors></ExampleColors>
    </div>
  );
}

export default connect()(App);
