import React, { Component } from 'react';
import './App.css';
import BlackJackContainer from '../../Containers/BlackJack/BlackJackContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BlackJackContainer />
      </div>
    );
  }
}

export default App;
