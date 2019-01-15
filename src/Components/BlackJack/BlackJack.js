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

  handleStandButtonClick = () => {
    let updatedDeck = this.state.deck;
    let { dealerCards, dealerCount } = this.state;
    while (dealerCount < 17) {
      dealerCards.push(updatedDeck.dealCard());
      dealerCount = this.getCount(dealerCards);

      this.setState({
        deck: updatedDeck,
        dealerCards,
        dealerCount,
      });
    }
  };

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
    // Need to put Aces at the end of the array to make it easier to calculate
    // if the Ace should be valued at 1 or 11
    const sortedCards = [];
    cards.forEach(card => {
      if (card.value === 'Ace') {
        sortedCards.push(card);
      } else {
        // unshift puts all other cards in front of any aces
        sortedCards.unshift(card);
      }
    });

    let count = sortedCards.reduce((total, card) => {
      if (card.value === 'Ace') {
        // add ace value that gets you closest to 21 without busting.
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + card.value;
      }
    }, 0);
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
