import React, { Component } from 'react';
import Player from '../../Components/Player/Player';
import Dealer from '../../Components/Dealer/Dealer';
import Deck from './../../Utilities/Deck';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: new Deck(),
      //hiddenDealerCard: [],
      dealerCards: [],
      dealerCount: 0,
      playerCards: [],
      playerCount: 0,
    };
  }

  handleHitButtonClick = () => {
    let updatedDeck = this.state.deck;
    let { playerCards, playerCount } = this.state;
    playerCards.push(updatedDeck.dealCard());
    playerCount = this.getCount(playerCards);
    if (playerCount > 21) {
      console.log('Bust');
    }

    this.setState({
      deck: updatedDeck,
      playerCards,
      playerCount,
    });
  };

  handleStandButtonClick = () => {
    let updatedDeck = this.state.deck;
    let { dealerCards, dealerCount } = this.state;
    //this.flipHiddenCard();
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

  /*flipHiddenCard = () => {
    let { dealerCards, dealerCount, hiddenDealerCard } = this.state;
    dealerCards.push(hiddenDealerCard);
    console.log(hiddenDealerCard);
    dealerCount = this.getCount(dealerCards);

    this.setState({
      dealerCards,
      dealerCount,
      hiddenDealerCard: [],
    });
  };
  */

  startingDeal = () => {
    let updatedDeck = this.state.deck;
    let {
      dealerCards,
      playerCards,
      dealerCount,
      playerCount,
      hiddenDealerCard,
    } = this.state;
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
      //hiddenDealerCard,
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
    const { wallet } = this.props;
    return (
      <div>
        <Dealer cards={dealerCards} count={dealerCount} />
        <Player cards={playerCards} count={playerCount} />
        <Button onClick={this.handleHitButtonClick}>Hit</Button>
        <Button onClick={this.handleStandButtonClick}>Stand</Button>
        <Typography variant="h3">${wallet}</Typography>
      </div>
    );
  }
}

export default GameContainer;
