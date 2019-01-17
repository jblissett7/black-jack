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
      dealerCards: [{ card: '', facedown: false }],
      dealerCount: 0,
      playerCards: [{ card: '', facedown: false }],
      playerCount: 0,
    };
  }

  handleHitButtonClick = () => {
    let { deck } = this.props;
    let { playerCards, playerCount } = this.state;
    playerCards.push({ card: deck.dealCard() });
    playerCount = this.getCount(playerCards);
    if (playerCount > 21) {
      console.log('Bust');
      this.props.onWinner('Dealer');
    } else {
      this.setState({
        playerCards,
        playerCount,
      });
    }
  };

  handleStandButtonClick = () => {
    let { deck } = this.props;
    let { dealerCards, dealerCount } = this.state;
    dealerCards[0].facedown = false;
    dealerCount = this.getCount(dealerCards);
    console.log(dealerCount);
    while (dealerCount < 17) {
      dealerCards.push({ card: deck.dealCard() });
      dealerCount = this.getCount(dealerCards);
      console.log(dealerCount);
    }
    this.setState({
      dealerCards,
      dealerCount,
    });

    if (dealerCount > 21) {
      this.props.onWinner('Player');
    } else {
      this.props.onWinner(this.getWinner(dealerCount));
    }
  };

  startingDeal = () => {
    //let updatedDeck = this.state.deck;
    let { deck } = this.props;
    let {
      dealerCards,
      playerCards,
      dealerCount,
      playerCount,
      //hiddenDealerCard,
    } = this.state;
    //updatedDeck.shuffle();
    playerCards[0] = { card: deck.dealCard(), facedown: false };
    dealerCards[0] = { card: deck.dealCard(), facedown: true };
    playerCards.push({ card: deck.dealCard() });
    dealerCards.push({ card: deck.dealCard() });
    dealerCount = this.getCount(dealerCards);
    playerCount = this.getCount(playerCards);

    this.setState({
      //deck: updatedDeck,
      dealerCards,
      playerCards,
      //hiddenDealerCard,
      dealerCount,
      playerCount,
    });
  };

  clearCards = () => {
    this.setState({
      dealerCards: [],
      playerCards: [],
      dealerCount: 0,
      playerCount: 0,
    });
  };

  getCount = cards => {
    // Need to put Aces at the end of the array to make it easier to calculate
    // if the Ace should be valued at 1 or 11
    const sortedCards = [];
    cards.forEach(card => {
      if (card.card.value === 'Ace') {
        sortedCards.push(card);
      } else {
        // unshift puts all other cards in front of any aces
        sortedCards.unshift(card);
      }
    });

    let count = sortedCards.reduce((total, card) => {
      // if card is facedown dont add it to the count
      if (!card.facedown) {
        if (card.card.value === 'Ace') {
          // add ace value that gets you closest to 21 without busting.
          return total + 11 <= 21 ? total + 11 : total + 1;
        } else {
          return total + card.card.value;
        }
      } else {
        return total;
      }
    }, 0);
    return count;
  };

  getWinner = dealerCount => {
    const { playerCount } = this.state;
    if (playerCount > dealerCount) {
      console.log('Player');
      return 'Player';
    } else if (dealerCount > playerCount) {
      console.log('Dealer');
      return 'Dealer';
    } else {
      console.log('Push');
      return 'Push';
    }
  };

  componentDidMount() {
    this.startingDeal();
  }
  render() {
    const { dealerCards, playerCards, dealerCount, playerCount } = this.state;
    const { wallet } = this.props;
    if (this.props.deal) {
      this.clearCards();
      this.startingDeal();
    }
    return (
      <div>
        <Typography variant="h3">BlackJack</Typography>
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
