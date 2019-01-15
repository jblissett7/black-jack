import React, { Component } from 'react';
import Player from '../Player/Player';
import Dealer from '../Dealer/Dealer';
import Deck from './../../Utilities/Deck';
import Button from '@material-ui/core/Button';

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

  startGame = () => {};

  handleHitButtonClick = () => {
    let updatedDeck = this.state.deck;
    let { playerCards, playerCount } = this.state;
    playerCards.push(updatedDeck.dealCard());
    playerCount = this.getCount(playerCards);

    this.setState({
      deck: updatedDeck,
      playerCards,
      playerCount,
    });
  };

  handleStandButtonClick = () => {};

  startingDeal = () => {
    let updatedDeck = this.state.deck;
    let { dealerCards, playerCards, dealerCount, playerCount } = this.state;
    updatedDeck.shuffle();
    playerCards.push(updatedDeck.dealCard());
    dealerCards.push(updatedDeck.dealCard());
    playerCards.push(updatedDeck.dealCard());
    dealerCards.push(updatedDeck.dealCard());
    dealerCount = this.getCount(dealerCards);
    playerCount = this.getCount(playerCards);

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
    this.startingDeal();
  }

  render() {
    const { dealerCards, playerCards, dealerCount, playerCount } = this.state;
    return (
      <div>
        <Dealer cards={dealerCards} count={dealerCount} />
        <Player cards={playerCards} count={playerCount} />
        <Button onClick={this.handleHitButtonClick}>Hit</Button>
        <Button onClick={this.handleStandButtonClick}>Stand</Button>
      </div>
    );
  }
}

export default BlackJack;
