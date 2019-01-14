import React, { Component } from 'react';
import Player from '../Player/Player';
import Dealer from '../Dealer/Dealer';
import Deck from './../../Utilities/Deck';

class BlackJack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: new Deck(),
      dealerCards: [],
      playerCards: [],
      wallet: 1000,
      betAmount: '',
    };
  }

  render() {
    return (
      <div>
        <Dealer />
        <Player />
      </div>
    );
  }
}

export default BlackJack;
