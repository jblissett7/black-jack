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

  deal = () => {
    let updatedDeck = this.state.deck;
    let { dealerCards, playerCards, dealerCount, playerCount } = this.state;
    updatedDeck.shuffle();
    //console.log(updatedDeck);
    playerCards.push(updatedDeck.dealCard());
    dealerCards.push(updatedDeck.dealCard());
    playerCards.push(updatedDeck.dealCard());
    dealerCards.push(updatedDeck.dealCard());
    dealerCount = this.getCount(dealerCards);
    playerCount = this.getCount(playerCards);
    //console.log(playerCards);
    //console.log(dealerCards);
    //console.log(updatedDeck);

    this.setState({
      deck: updatedDeck,
      dealerCards,
      playerCards,
      dealerCount,
      playerCount,
    });
  };

  getCount = cards => {
    let count = 0;
    cards.forEach(card => {
      count += card.value;
    });
    return count;
  };

  componentDidMount() {
    this.deal();
  }

  render() {
    const { dealerCards, playerCards, dealerCount, playerCount } = this.state;
    return (
      <div>
        <Dealer cards={dealerCards} count={dealerCount} />
        <Player cards={playerCards} count={playerCount} />
      </div>
    );
  }
}

export default BlackJack;
